import { createContext, useContext, RefObject } from 'react'

const LayoutContentRefContext = createContext<RefObject<HTMLDivElement | null> | null>(null)

export const useLayoutContentRef = () => {
  const context = useContext(LayoutContentRefContext)
  if (context === null) {
    throw new Error('useLayoutContentRef must be used within a LayoutContentRefProvider')
  }
  return context
}

export default LayoutContentRefContext
