import parse from './parse'

describe('parse', () => {
  test('returns the data for a valid collection', () => {
    const value = { favorites: [1, 4], groups: [{ id: 'g_1', name: 'Starters', pokemonIds: [1] }] }

    expect(parse(value)).toEqual(value)
  })

  test.each([
    { label: 'a missing field', value: { favorites: [] } },
    { label: 'a non-numeric id', value: { favorites: ['1'], groups: [] } },
    { label: 'a non-object', value: 'collection' },
  ])('returns null for $label', ({ value }) => {
    expect(parse(value)).toBeNull()
  })
})
