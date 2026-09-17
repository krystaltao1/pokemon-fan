import { act, renderHook } from '@testing-library/react'
import usePagination from './usePagination'

const items = [1, 2, 3, 4, 5]

describe('usePagination', () => {
  test('starts on the first page', () => {
    const { result } = renderHook(() => usePagination(items, 2))

    expect(result.current.page).toBe(1)
    expect(result.current.pageItems).toEqual([1, 2])
    expect(result.current.totalPages).toBe(3)
  })

  test('moves to the requested page', () => {
    const { result } = renderHook(() => usePagination(items, 2))

    act(() => result.current.setPage(3))

    expect(result.current.page).toBe(3)
    expect(result.current.pageItems).toEqual([5])
  })

  test('keeps the page when the same items are rendered again', () => {
    const { result, rerender } = renderHook(({ list }) => usePagination(list, 2), { initialProps: { list: items } })

    act(() => result.current.setPage(2))
    rerender({ list: items })

    expect(result.current.page).toBe(2)
  })

  test('resets to the first page when the items change', () => {
    const { result, rerender } = renderHook(({ list }) => usePagination(list, 2), { initialProps: { list: items } })

    act(() => result.current.setPage(2))
    rerender({ list: [6, 7, 8] })

    expect(result.current.page).toBe(1)
    expect(result.current.pageItems).toEqual([6, 7])
    expect(result.current.totalPages).toBe(2)
  })
})
