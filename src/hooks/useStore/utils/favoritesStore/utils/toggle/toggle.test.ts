import toggle from './toggle'

describe('toggle', () => {
  test('adds a non-favorite', () => {
    expect(toggle([1], 4)).toEqual([1, 4])
  })

  test('removes a favorite', () => {
    expect(toggle([1, 4], 4)).toEqual([1])
  })
})
