import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

import { prisma } from '@/lib/trpc/prismaClient'

import { randomUUID } from 'crypto'

export default {
  // pages: {
  //   signIn: '/auth/signin'
  // },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: 'Sign in',
      id: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
        nick: {
          label: 'Nick',
          type: 'text',
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null
        }

        const { email, password, nick } = credentials

        if (!email || !password || !nick) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: String(email),
          },
        })

        if (!user?.password) {
          return null
        }

        const isPasswordCorrect = await bcrypt.compare(String(password), user.password)

        if (!isPasswordCorrect || user.nick !== nick) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          nick: user.nick,
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (!user.email || !account) {
        return false
      }

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
        include: { accounts: true },
      })

      if (existingUser) {
        const hasAccount = existingUser.accounts.some((acc) => acc.provider === account.provider)

        if (hasAccount) {
          return true
        }

        return false
      }

      const nick = `user_${randomUUID().slice(0, 8)}`

      await prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          nick,
          password: null,
          accounts: {
            create: {
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              refresh_token: account.refresh_token,
            },
          },
        },
      })

      return true
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user

      const paths = ['/']
      const isProtected = paths.some((path) => nextUrl.pathname.startsWith(path))

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL('/api/auth/signin', nextUrl.origin)

        redirectUrl.searchParams.append('callbackUrl', nextUrl.href)

        return Response.redirect(redirectUrl)
      }

      return true
    },

    jwt: ({ token, user }) => {
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const u = user as unknown as any

        return {
          ...token,
          id: u.id,
        }
      }

      return token
    },

    session(params) {
      return {
        ...params.session,
        user: {
          ...params.session.user,
          id: params.token.id as string,
        },
      }
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },

  trustHost: true,

  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig
