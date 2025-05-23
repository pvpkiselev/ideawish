import { createTRPCReact, httpBatchLink } from '@trpc/react-query'
import SuperJSON from 'superjson'

import type { TrpcRouter } from '@/lib/trpc/server/router'

export const trpc = createTRPCReact<TrpcRouter>()

export const createTRPCClient = () =>
  trpc.createClient({
    links: [
      httpBatchLink({
        url: '/api/trpc',
        transformer: SuperJSON,
      }),
    ],
  })
