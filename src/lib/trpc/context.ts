import { prisma } from './prismaClient'

export const createAppContext = () => {
  return {
    prisma,
    stop: async () => {
      await prisma.$disconnect()
    },
  }
}

export type AppContext = ReturnType<typeof createAppContext>
