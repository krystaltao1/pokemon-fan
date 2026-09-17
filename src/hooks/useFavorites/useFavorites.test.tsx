import { renderHook } from '@testing-library/react'
import StoreContext from '@context/StoreContext'
import favoritesStore from '@hooks/useStore/utils/favoritesStore'
import groupsStore from '@hooks/useStore/utils/groupsStore'
import useFavorites from './useFavorites'

const store = { favorites: favoritesStore([1], vi.fn()), groups: groupsStore([], vi.fn()) }

describe('useFavorites', () => {
  test('returns the favorites slice of the store', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: ({ children }) => <StoreContext.Provider value={store}>{children}</StoreContext.Provider>,
    })

    expect(result.current).toBe(store.favorites)
  })

  test('throws outside the provider', () => {
    expect(() => renderHook(() => useFavorites())).toThrow('useFavorites must be used within StoreProvider')
  })
})
