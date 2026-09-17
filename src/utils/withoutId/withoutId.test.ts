import withoutId from './withoutId'

describe('withoutId', () => {
  test('removes the id', () => {
    expect(withoutId([1, 2, 3], 2)).toEqual([1, 3])
  })

  test('leaves the list unchanged when the id is absent', () => {
    expect(withoutId([1, 3], 2)).toEqual([1, 3])
  })
})
