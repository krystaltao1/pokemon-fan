import pickByIds from './pickByIds'

const byId = new Map([
  [1, { id: 1, name: 'bulbasaur' }],
  [4, { id: 4, name: 'charmander' }],
])

describe('pickByIds', () => {
  test('returns the items in the order of the ids', () => {
    expect(pickByIds(byId, [4, 1])).toEqual([
      { id: 4, name: 'charmander' },
      { id: 1, name: 'bulbasaur' },
    ])
  })

  test('skips unknown ids', () => {
    expect(pickByIds(byId, [999, 1])).toEqual([{ id: 1, name: 'bulbasaur' }])
  })

  test('returns an empty array for no ids', () => {
    expect(pickByIds(byId, [])).toEqual([])
  })
})
