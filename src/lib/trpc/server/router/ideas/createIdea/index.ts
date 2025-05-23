import { trpcProcedure } from '@/lib/trpc/server/trpc'

import { zCreateIdeaTrpcInput } from './input'

export const createIdeaTrpcRoute = trpcProcedure.input(zCreateIdeaTrpcInput).mutation(async ({ ctx, input }) => {
  if (!ctx.me) {
    throw Error('UNAUTHORIZED')
  }

  const exIdea = await ctx.prisma.idea.findUnique({
    where: {
      nick: input.nick,
    },
  })

  if (exIdea) {
    throw Error('Idea with this nick already exists')
  }

  await ctx.prisma.idea.create({
    data: { ...input, authorId: ctx.me.id },
  })

  return true
})
