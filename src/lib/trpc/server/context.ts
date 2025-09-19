import { auth } from '../../auth/auth'
import { prisma } from '../../db'

export const createTRPCContext = async () => {
  const session = await auth()

  const user = session?.user
    ? await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { id: true, name: true, email: true },
      })
    : null

  return {
    prisma,
    session,
    user,
  }
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>
