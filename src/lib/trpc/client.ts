import { createTRPCReact, httpBatchLink } from '@trpc/react-query'
import SuperJSON from 'superjson'

import type { AppRouter } from '@/lib/trpc/server/router'

export const trpc = createTRPCReact<AppRouter>()

export const createTRPCClient = () =>
  trpc.createClient({
    links: [
      httpBatchLink({
        url: '/api/trpc',
        transformer: SuperJSON,
      }),
    ],
  })
