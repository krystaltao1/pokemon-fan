import getMembers from './getMembers'

const byId = new Map([
  [1, { id: 1, name: 'bulbasaur' }],
  [4, { id: 4, name: 'charmander' }],
])

describe('getMembers', () => {
  test('replaces the ids of every group with the matching items', () => {
    expect(
      getMembers(
        [
          { id: 'a', name: 'Starters', pokemonIds: [1, 4] },
          { id: 'b', name: 'Empty', pokemonIds: [] },
        ],
        byId
      )
    ).toEqual([
      {
        id: 'a',
        name: 'Starters',
        members: [
          { id: 1, name: 'bulbasaur' },
          { id: 4, name: 'charmander' },
        ],
      },
      { id: 'b', name: 'Empty', members: [] },
    ])
  })

  test('skips ids that are not indexed', () => {
    expect(getMembers([{ id: 'a', name: 'Starters', pokemonIds: [999, 4] }], byId)).toEqual([
      { id: 'a', name: 'Starters', members: [{ id: 4, name: 'charmander' }] },
    ])
  })
})
