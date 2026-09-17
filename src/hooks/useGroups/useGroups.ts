import { useContext } from 'react'
import StoreContext from '@context/StoreContext'

const useGroups = () => {
  const store = useContext(StoreContext)
  if (store === null) throw new Error('useGroups must be used within StoreProvider')
  return store.groups
}

export default useGroups
