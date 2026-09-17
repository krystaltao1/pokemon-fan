import { act, renderHook } from '@testing-library/react'
import useLocalStorage from './useLocalStorage'

const parse = vi.fn()

describe('useLocalStorage', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('reads the initial value from storage', () => {
    localStorage.setItem('key', '5')
    parse.mockReturnValue(5)

    const { result } = renderHook(() => useLocalStorage('key', 0, parse))

    expect(parse).toHaveBeenCalledWith(5)
    expect(result.current[0]).toBe(5)
  })

  test('writes nothing on mount', () => {
    renderHook(() => useLocalStorage('key', 0, parse))

    expect(localStorage.getItem('key')).toBeNull()
  })

  test('writes the value after it is set', () => {
    const { result } = renderHook(() => useLocalStorage('key', 0, parse))

    act(() => result.current[1](1))

    expect(result.current[0]).toBe(1)
    expect(localStorage.getItem('key')).toBe('1')
  })

  test('uses the initial value when parse returns null', () => {
    localStorage.setItem('key', '"five"')
    parse.mockReturnValue(null)

    const { result } = renderHook(() => useLocalStorage('key', 0, parse))

    expect(result.current[0]).toBe(0)
  })
})
