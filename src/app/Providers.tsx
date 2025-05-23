'use client'

import LayoutContentWrapper from '@/components/LayoutContentWrapper'
import { TrpcProvider } from '@/lib/TrpcProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TrpcProvider>
      <LayoutContentWrapper>{children}</LayoutContentWrapper>
    </TrpcProvider>
  )
}
