import favoritesStore from './favoritesStore'

describe('favoritesStore', () => {
  test('exposes the favorites', () => {
    expect(favoritesStore([1, 4], vi.fn()).favorites).toEqual([1, 4])
  })

  test('reports whether a pokemon is a favorite', () => {
    const store = favoritesStore([1, 4], vi.fn())

    expect(store.isFavorite(1)).toBe(true)
    expect(store.isFavorite(7)).toBe(false)
  })

  test('toggles a favorite through the setter', () => {
    const setFavorites = vi.fn()

    favoritesStore([1], setFavorites).toggleFavorite(4)

    const [update] = setFavorites.mock.calls[0]
    expect(update([1])).toEqual([1, 4])
    expect(update([1, 4])).toEqual([1])
  })
})
