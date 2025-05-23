'use client'

import { signIn } from 'next-auth/react'

export default function SignInButton() {
  return (
    <button
      onClick={() => signIn()}
      type="button"
      className="inline-block cursor-pointer rounded-lg border-2 border-current px-4 py-2 text-current transition-all hover:scale-[0.98]"
    >
      Sign in
    </button>
  )
}
