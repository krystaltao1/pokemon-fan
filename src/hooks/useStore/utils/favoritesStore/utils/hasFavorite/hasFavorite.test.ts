import hasFavorite from './hasFavorite'

describe('hasFavorite', () => {
  test('returns true for a favorite', () => {
    expect(hasFavorite([1, 4], 4)).toBe(true)
  })

  test('returns false for a non-favorite', () => {
    expect(hasFavorite([1, 4], 7)).toBe(false)
  })
})
