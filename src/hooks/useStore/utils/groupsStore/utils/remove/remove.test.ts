import remove from './remove'

const groups = [
  { id: 'a', name: 'A', pokemonIds: [1] },
  { id: 'b', name: 'B', pokemonIds: [] },
]

describe('remove', () => {
  test('drops the group with the id', () => {
    expect(remove(groups, 'a')).toEqual([groups[1]])
  })

  test('keeps every group when the id is unknown', () => {
    expect(remove(groups, 'z')).toEqual(groups)
  })
})
