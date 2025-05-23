import { auth } from '../../../auth'

import { createAppContext } from './context'

export const getServerContext = async () => {
  const appContext = createAppContext()
  const session = await auth()

  const me = session?.user
    ? await appContext.prisma.user.findUnique({
        where: { id: session.user.id },
        select: { id: true, name: true, email: true },
      })
    : null

  return {
    ...appContext,
    session,
    me,
  }
}

export type ServerContext = Awaited<ReturnType<typeof getServerContext>>
