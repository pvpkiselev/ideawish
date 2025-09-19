import { protectedProcedure } from '../../../trpc'

import { zCreateIdeaInput } from './input'

export const createIdeaRoute = protectedProcedure.input(zCreateIdeaInput).mutation(async ({ ctx, input }) => {
  const exIdea = await ctx.prisma.idea.findUnique({
    where: {
      nick: input.nick,
    },
  })

  if (exIdea) {
    throw Error('Idea with this nick already exists')
  }

  await ctx.prisma.idea.create({
    data: {
      name: input.name,
      nick: input.nick,
      description: input.description,
      text: input.text,
      author: {
        connect: { id: ctx.user?.id },
      },
    },
  })

  return true
})
