'use client'

import LayoutContentWrapper from '@/components/LayoutContentWrapper'
import { TRPCProvider } from '@/lib/trpc/TRPCProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCProvider>
      <LayoutContentWrapper>{children}</LayoutContentWrapper>
    </TRPCProvider>
  )
}
