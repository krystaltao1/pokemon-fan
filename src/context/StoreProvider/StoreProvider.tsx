import type { FC, ReactNode } from 'react'
import StoreContext from '@context/StoreContext'
import useStore from '@hooks/useStore'

interface Props {
  children: ReactNode
}

const StoreProvider: FC<Props> = ({ children }) => {
  const store = useStore()

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export default StoreProvider
