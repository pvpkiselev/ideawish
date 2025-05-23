import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { createTrpcRouter } from '../trpc'

import { ideasRouter } from './ideas'
import { utilsHealthRouter } from './utils'

export const trpcRouter = createTrpcRouter({
  ideas: ideasRouter,
  utils: utilsHealthRouter,
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
