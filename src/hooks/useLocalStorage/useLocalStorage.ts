import { useEffect, useRef, useState } from 'react'
import readStorage from './utils/readStorage'
import writeStorage from './utils/writeStorage'

const useLocalStorage = <T>(key: string, initial: T, parse: (value: unknown) => T | null) => {
  const state = useState<T>(() => readStorage(key, initial, parse))
  const [value] = state
  const ref = useRef(value)

  useEffect(() => {
    if (value === ref.current) return
    writeStorage(key, value)
  }, [key, value])

  return state
}

export default useLocalStorage
