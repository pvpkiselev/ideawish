import { createCaller } from '@/lib/trpc/server/caller'

export default async function IdeaPage({ params }: { params: Promise<{ nick: string }> }) {
  const { nick } = await params

  const serverApi = await createCaller()

  const { idea } = await serverApi.ideas.getIdea({
    nick,
  })

  if (!idea) {
    return (
      <div className="mx-auto mt-8 flex min-h-screen max-w-2xl flex-col">
        <div>No post found.</div>
      </div>
    )
  }

  return (
    <div className="mx-auto mt-8 flex min-h-screen max-w-2xl flex-col">
      {idea && (
        <article className="w-full max-w-2xl">
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl md:text-4xl">{idea.name}</h1>
          <p className="text-sm sm:text-base">by {idea.authorId}</p>
          <div className="prose prose-gray prose-sm sm:prose-base lg:prose-lg mt-4 sm:mt-8">
            {idea.description || 'No content available.'}
          </div>
        </article>
      )}
    </div>
  )
}
