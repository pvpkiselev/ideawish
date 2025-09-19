import { initTRPC, TRPCError } from '@trpc/server'
import SuperJSON from 'superjson'

import { TRPCContext } from './context'

const trpc = initTRPC.context<TRPCContext>().create({
  transformer: SuperJSON,
  errorFormatter({ shape }) {
    return shape
  },
})

const isAuthed = trpc.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  })
})

export const createAppRouter = trpc.router
export const publicProcedure = trpc.procedure
export const protectedProcedure = trpc.procedure.use(isAuthed)
