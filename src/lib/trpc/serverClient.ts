import type { TrpcRouterInput, TrpcRouterOutput } from '@/lib/trpc/server/router'
import { trpcRouter } from '@/lib/trpc/server/router'

import { TrpcContext } from './server/trpc'
import { getServerContext } from './serverContext'

export const serverClient = {
  ideas: {
    getIdeas: (input: TrpcRouterInput['ideas']['getIdeas']): Promise<TrpcRouterOutput['ideas']['getIdeas']> => {
      return withServerContext(async (ctx) => trpcRouter.createCaller(ctx).ideas.getIdeas(input))
    },
    getIdea: (input: TrpcRouterInput['ideas']['getIdea']): Promise<TrpcRouterOutput['ideas']['getIdea']> => {
      return withServerContext(async (ctx) => trpcRouter.createCaller(ctx).ideas.getIdea(input))
    },
    createIdea: (input: TrpcRouterInput['ideas']['createIdea']): Promise<TrpcRouterOutput['ideas']['createIdea']> => {
      return withServerContext(async (ctx) => trpcRouter.createCaller(ctx).ideas.createIdea(input))
    },
  },

  utils: {
    health: (): Promise<TrpcRouterOutput['utils']['health']> => {
      return withServerContext(async (ctx) => trpcRouter.createCaller(ctx).utils.health())
    },
  },
}

async function withServerContext<T>(fn: (ctx: TrpcContext) => Promise<T>): Promise<T> {
  const ctx = await getServerContext()
  try {
    return await fn(ctx)
  } finally {
    await ctx.stop?.()
  }
}
