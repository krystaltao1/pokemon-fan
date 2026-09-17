import getIds from './getIds'

const groups = [
  { id: 'a', name: 'A', pokemonIds: [1, 4] },
  { id: 'b', name: 'B', pokemonIds: [4] },
  { id: 'c', name: 'C', pokemonIds: [] },
]

describe('getIds', () => {
  test('returns the ids of the groups containing the pokemon', () => {
    expect(getIds(groups, 4)).toEqual(['a', 'b'])
  })

  test('returns an empty list when no group contains the pokemon', () => {
    expect(getIds(groups, 7)).toEqual([])
  })
})
