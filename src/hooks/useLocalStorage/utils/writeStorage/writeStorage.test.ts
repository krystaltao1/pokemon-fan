import writeStorage from './writeStorage'

describe('writeStorage', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('stores the value as JSON', () => {
    writeStorage('key', { favorites: [1] })

    expect(localStorage.getItem('key')).toBe('{"favorites":[1]}')
  })

  test('ignores storage failures', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError')
    })

    expect(() => writeStorage('key', 1)).not.toThrow()
  })
})
