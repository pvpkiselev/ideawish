import { auth } from '../../auth'

import { createAppContext } from './ctx'

export const getServerContext = async () => {
  const appContext = createAppContext()
  const session = await auth()
  const userId = session?.user?.id ?? null

  const me = userId ? await appContext.prisma.user.findUnique({ where: { id: userId } }) : null

  return {
    ...appContext,
    session,
    me,
  }
}

export type ServerContext = Awaited<ReturnType<typeof getServerContext>>
