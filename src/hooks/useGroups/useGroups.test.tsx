import { renderHook } from '@testing-library/react'
import StoreContext from '@context/StoreContext'
import favoritesStore from '@hooks/useStore/utils/favoritesStore'
import groupsStore from '@hooks/useStore/utils/groupsStore'
import useGroups from './useGroups'

const store = { favorites: favoritesStore([], vi.fn()), groups: groupsStore([], vi.fn()) }

describe('useGroups', () => {
  test('returns the groups slice of the store', () => {
    const { result } = renderHook(() => useGroups(), {
      wrapper: ({ children }) => <StoreContext.Provider value={store}>{children}</StoreContext.Provider>,
    })

    expect(result.current).toBe(store.groups)
  })

  test('throws outside the provider', () => {
    expect(() => renderHook(() => useGroups())).toThrow('useGroups must be used within StoreProvider')
  })
})
