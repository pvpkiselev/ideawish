'use client'

import { useRef } from 'react'

import LayoutContentRefContext from '@/context/LayoutContentRefContext'

export default function LayoutContentWrapper({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <LayoutContentRefContext.Provider value={contentRef}>
      <div ref={contentRef} className="flex-grow overflow-y-auto">
        {children}
      </div>
    </LayoutContentRefContext.Provider>
  )
}
