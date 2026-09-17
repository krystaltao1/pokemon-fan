import withId from './withId'

describe('withId', () => {
  test('appends a missing id', () => {
    expect(withId([1, 2], 3)).toEqual([1, 2, 3])
  })

  test('returns the same reference when the id is already included', () => {
    const ids = [1, 2]

    expect(withId(ids, 2)).toBe(ids)
  })
})
