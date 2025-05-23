import Link from 'next/link'

import AllIdeas from '@/components/AllIdeas'
import { serverClient } from '@/lib/trpc/serverClient'

export default async function Home() {
  const initialIdeas = await serverClient.ideas.getIdeas({
    search: '',
    limit: 10,
  })

  return (
    <div className="mx-auto mt-8 flex min-h-screen max-w-2xl flex-col">
      <h1 className="mb-8 text-4xl font-bold">Ideas</h1>

      <AllIdeas initialIdeas={initialIdeas} />

      <Link
        href="/ideas/create"
        className="inline-block rounded-lg border-2 border-current px-4 py-2 text-current transition-all hover:scale-[0.98]"
      >
        Create New Idea
      </Link>
    </div>
  )
}
