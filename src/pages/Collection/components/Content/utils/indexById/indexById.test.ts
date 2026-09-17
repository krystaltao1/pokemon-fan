import indexById from './indexById'

const items = [
  { id: 1, name: 'bulbasaur' },
  { id: 4, name: 'charmander' },
]

describe('indexById', () => {
  test('maps every item by its id', () => {
    const byId = indexById(items)

    expect(byId.size).toBe(2)
    expect(byId.get(1)).toBe(items[0])
    expect(byId.get(4)).toBe(items[1])
  })

  test('returns an empty map for no items', () => {
    expect(indexById([]).size).toBe(0)
  })
})
