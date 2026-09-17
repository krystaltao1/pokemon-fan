import useLocalStorage from '@hooks/useLocalStorage'
import favoritesStore from './utils/favoritesStore'
import groupsStore from './utils/groupsStore'
import parse from './utils/parse'

const STORAGE_KEY = 'pokefan.collection'

type State = NonNullable<ReturnType<typeof parse>>

const EMPTY_STATE: State = { favorites: [], groups: [] }

const useStore = () => {
  const [state, setState] = useLocalStorage(STORAGE_KEY, EMPTY_STATE, parse)

  const setFavorites = (update: (prev: State['favorites']) => State['favorites']) =>
    setState((prev) => ({ ...prev, favorites: update(prev.favorites) }))

  const setGroups = (update: (prev: State['groups']) => State['groups']) =>
    setState((prev) => ({ ...prev, groups: update(prev.groups) }))

  const favorites = favoritesStore(state.favorites, setFavorites)
  const groups = groupsStore(state.groups, setGroups)

  return { favorites, groups }
}

export default useStore
