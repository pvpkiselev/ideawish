import { initTRPC, TRPCError } from '@trpc/server'
import SuperJSON from 'superjson'

import { getServerContext } from '@/lib/trpc/serverContext'

export const createContext = async () => await getServerContext()

export type TrpcContext = Awaited<ReturnType<typeof createContext>>

const trpc = initTRPC.context<TrpcContext>().create({
  transformer: SuperJSON,
})

const isAuthed = trpc.middleware(({ next, ctx }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    ctx: {
      me: ctx.session.user,
    },
  })
})

export const createTrpcRouter = trpc.router
export const trpcProcedure = trpc.procedure
export const protectedProcedure = trpc.procedure.use(isAuthed)
