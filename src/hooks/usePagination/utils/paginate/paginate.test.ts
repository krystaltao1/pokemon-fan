import paginate from './paginate'

const items = [1, 2, 3, 4, 5]

describe('paginate', () => {
  test('returns the first page', () => {
    expect(paginate(items, 1, 2)).toEqual({ items: [1, 2], totalPages: 3 })
  })

  test('returns a partial last page', () => {
    expect(paginate(items, 3, 2)).toEqual({ items: [5], totalPages: 3 })
  })

  test('returns everything on one page when the items fit', () => {
    expect(paginate(items, 1, 20)).toEqual({ items, totalPages: 1 })
  })

  test('returns one empty page for an empty array', () => {
    expect(paginate([], 1, 2)).toEqual({ items: [], totalPages: 1 })
  })
})
