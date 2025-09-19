/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'

/**
 * Returns a debounced version of the provided value.
 * The debounced value only updates after the specified delay
 * has elapsed without further changes to the input value.
 */
export function useDebouncedValue<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

  React.useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedValue(value), delay)
    return () => window.clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

/**
 * Returns a debounced function that delays invoking `fn` until after `delay` ms
 * have elapsed since the last time the debounced function was called.
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300,
  deps: React.DependencyList = []
): (...args: Parameters<T>) => void {
  const fnRef = React.useRef(fn)
  const timeoutRef = React.useRef<number | undefined>(undefined)

  // Always keep latest fn in ref to avoid stale closure
  React.useEffect(() => {
    fnRef.current = fn
  }, [fn])

  // Clear timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current !== undefined) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Recreate debounced function when delay or deps change
  const debounced = React.useMemo(() => {
    return (...args: Parameters<T>) => {
      if (timeoutRef.current !== undefined) {
        window.clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = window.setTimeout(() => {
        fnRef.current(...args)
      }, delay)
    }
  }, [delay, ...deps])

  return debounced
}
