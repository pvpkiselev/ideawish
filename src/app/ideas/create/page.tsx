import CreateIdeaForm from '@/components/ideas/CreateIdeaForm'
import SignInButton from '@/components/SignInButton'

import { auth } from '../../../lib/auth/auth'

export default async function CreateIdeaPage() {
  const session = await auth()

  if (!session?.user) {
    return (
      <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-4">
        <p>You must be signed in to create a idea.</p>
        <SignInButton />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-6 text-2xl font-bold">Create New Idea</h1>
      <CreateIdeaForm />
    </div>
  )
}
