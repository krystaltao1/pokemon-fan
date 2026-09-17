import { useCallback, useEffect, useRef } from 'react'

const useClickOutside = (onClickOutside: () => void) => {
  const element = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (element.current && event.target instanceof Node && !element.current.contains(event.target)) {
        onClickOutside()
      }
    }

    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [onClickOutside])

  return useCallback((node: HTMLElement | null) => {
    element.current = node
  }, [])
}

export default useClickOutside
