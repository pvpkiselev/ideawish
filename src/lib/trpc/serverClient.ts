import type { TrpcRouterInput } from '@/server/router'
import { trpcRouter } from '@/server/router'

import { getServerContext } from '../serverCtx'

export const serverClient = {
  ideas: {
    getIdeas: async (input: TrpcRouterInput['getIdeas']) => {
      const ctx = await getServerContext()
      return trpcRouter.createCaller(ctx).getIdeas(input)
    },
    getIdea: async (input: TrpcRouterInput['getIdea']) => {
      const ctx = await getServerContext()
      return trpcRouter.createCaller(ctx).getIdea(input)
    },
    createIdea: async (input: TrpcRouterInput['createIdea']) => {
      const ctx = await getServerContext()
      return trpcRouter.createCaller(ctx).createIdea(input)
    },
  },
}
