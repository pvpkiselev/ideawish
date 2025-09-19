import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { createAppRouter } from '../trpc'

import { ideasRouter } from './ideas'
import { utilsHealthRouter } from './utils'

export const appRouter = createAppRouter({
  ideas: ideasRouter,
  utils: utilsHealthRouter,
})

export type AppRouter = typeof appRouter
export type AppRouterInput = inferRouterInputs<AppRouter>
export type AppRouterOutput = inferRouterOutputs<AppRouter>
