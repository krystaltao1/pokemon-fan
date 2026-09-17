import filterByName from './filterByName'

const items = [{ name: 'charmander' }, { name: 'charmeleon' }, { name: 'squirtle' }]

describe('filterByName', () => {
  test('returns the same array for an empty query', () => {
    expect(filterByName(items, '')).toBe(items)
  })

  test('returns the same array for a whitespace query', () => {
    expect(filterByName(items, '   ')).toBe(items)
  })

  test('keeps the items whose name contains the query', () => {
    expect(filterByName(items, 'char')).toEqual([{ name: 'charmander' }, { name: 'charmeleon' }])
  })

  test('ignores case and surrounding whitespace', () => {
    expect(filterByName(items, '  SQUIRT ')).toEqual([{ name: 'squirtle' }])
  })

  test('returns an empty array when nothing matches', () => {
    expect(filterByName(items, 'zzzz')).toEqual([])
  })
})
