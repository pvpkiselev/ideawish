import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'

import { prisma } from '@/lib/trpc/prismaClient'

import authConfig from './auth.config'

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
})
