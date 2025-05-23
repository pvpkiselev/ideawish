import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

import { trpcRouter } from '@/lib/trpc/server/router'
import { createContext } from '@/lib/trpc/server/trpc'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: trpcRouter,
    createContext,
  })

export { handler as GET, handler as POST }
