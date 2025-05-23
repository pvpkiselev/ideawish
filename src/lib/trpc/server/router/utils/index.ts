import { createTrpcRouter, trpcProcedure } from '../../trpc'

export const utilsHealthRouter = createTrpcRouter({
  health: trpcProcedure.query(() => 'OK'),
})
