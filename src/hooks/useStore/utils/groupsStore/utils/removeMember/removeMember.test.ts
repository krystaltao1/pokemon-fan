import removeMember from './removeMember'

const groups = [
  { id: 'a', name: 'A', pokemonIds: [1, 4] },
  { id: 'b', name: 'B', pokemonIds: [4] },
]

describe('removeMember', () => {
  test('removes the pokemon from the matching group only', () => {
    expect(removeMember(groups, 'a', 4)).toEqual([{ id: 'a', name: 'A', pokemonIds: [1] }, groups[1]])
  })
})
