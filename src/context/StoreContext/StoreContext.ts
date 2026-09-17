import { createContext } from 'react'
import type useStore from '@hooks/useStore'

const StoreContext = createContext<ReturnType<typeof useStore> | null>(null)

export default StoreContext
