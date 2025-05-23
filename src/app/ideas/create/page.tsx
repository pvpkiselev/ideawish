import { revalidatePath } from 'next/cache'
import Form from 'next/form'
import { redirect } from 'next/navigation'

import SignInButton from '@/components/SignInButton'
import { serverClient } from '@/lib/trpc/serverClient'

import { auth } from '../../../../auth'

export default async function NewIdea() {
  const session = await auth()

  if (!session?.user?.id) {
    return (
      <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-4">
        <p>You must be signed in to create a idea.</p>
        <SignInButton />
      </div>
    )
  }

  async function createPost(formData: FormData) {
    'use server'

    if (!session?.user?.id) {
      return
    }

    const name = formData.get('name') as string
    const nick = formData.get('nick') as string
    const text = formData.get('text') as string
    const description = formData.get('description') as string

    await serverClient.ideas.createIdea({
      name,
      nick,
      description,
      text,
    })

    revalidatePath('/')
    redirect('/')
  }

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-6 text-2xl font-bold">Create New Idea</h1>
      <Form action={createPost} className="space-y-6">
        <div>
          <label htmlFor="title" className="mb-2 block text-lg">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your idea name"
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>
        <div>
          <label htmlFor="nick" className="mb-2 block text-lg">
            Nick
          </label>
          <input
            type="text"
            id="nick"
            name="nick"
            placeholder="Enter your idea nick"
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>
        <div>
          <label htmlFor="description" className="mb-2 block text-lg">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Enter your idea description"
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>
        <div>
          <label htmlFor="text" className="mb-2 block text-lg">
            Text
          </label>
          <textarea
            id="text"
            name="text"
            placeholder="Write your idea text here..."
            rows={6}
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>
        <button
          type="submit"
          className="inline-block w-full rounded-lg border-2 border-current px-4 py-2 text-current transition-all hover:scale-[0.98]"
        >
          Create Idea
        </button>
      </Form>
    </div>
  )
}
