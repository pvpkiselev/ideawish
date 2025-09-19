import { createAppRouter, publicProcedure } from '../../trpc'

export const utilsHealthRouter = createAppRouter({
  health: publicProcedure.query(() => 'OK'),
})
