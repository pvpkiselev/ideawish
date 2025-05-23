'use client'

import { createTRPCReact, httpBatchLink } from '@trpc/react-query'
import SuperJSON from 'superjson'

import type { TrpcRouter } from '@/server/router'

export const trpc = createTRPCReact<TrpcRouter>()

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: '/api/trpc',
      transformer: SuperJSON,
    }),
  ],
})
