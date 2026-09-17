import { useContext } from 'react'
import StoreContext from '@context/StoreContext'

const useFavorites = () => {
  const store = useContext(StoreContext)
  if (store === null) throw new Error('useFavorites must be used within StoreProvider')
  return store.favorites
}

export default useFavorites
