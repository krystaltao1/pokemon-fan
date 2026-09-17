import addMember from './addMember'

const groups = [
  { id: 'a', name: 'A', pokemonIds: [1] },
  { id: 'b', name: 'B', pokemonIds: [] },
]

describe('addMember', () => {
  test('adds the pokemon to the matching group only', () => {
    expect(addMember(groups, 'b', 4)).toEqual([groups[0], { id: 'b', name: 'B', pokemonIds: [4] }])
  })

  test('does not duplicate an existing member', () => {
    expect(addMember(groups, 'a', 1)).toEqual(groups)
  })
})
