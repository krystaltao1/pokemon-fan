import readStorage from './readStorage'

const parse = vi.fn()

describe('readStorage', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('returns the initial value when the key is missing', () => {
    expect(readStorage('key', 0, parse)).toBe(0)
    expect(parse).not.toHaveBeenCalled()
  })

  test('returns the parsed value when stored', () => {
    localStorage.setItem('key', '{"count":5}')
    parse.mockReturnValue(5)

    expect(readStorage('key', 0, parse)).toBe(5)
    expect(parse).toHaveBeenCalledWith({ count: 5 })
  })

  test('returns the initial value when parse rejects the stored value', () => {
    localStorage.setItem('key', '"five"')
    parse.mockReturnValue(null)

    expect(readStorage('key', 0, parse)).toBe(0)
  })

  test('returns the initial value for invalid JSON', () => {
    localStorage.setItem('key', '{oops')

    expect(readStorage('key', 0, parse)).toBe(0)
    expect(parse).not.toHaveBeenCalled()
  })
})
