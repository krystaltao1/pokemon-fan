import { renderHook } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useClickOutside from './useClickOutside'

describe('useClickOutside', () => {
  test('fires when clicking outside the bound element', async () => {
    const onClickOutside = vi.fn()
    const user = userEvent.setup()
    const inside = document.createElement('div')
    document.body.append(inside)
    const { result } = renderHook(() => useClickOutside(onClickOutside))
    result.current(inside)

    await user.click(document.body)

    expect(onClickOutside).toHaveBeenCalledTimes(1)
  })

  test('does not fire when clicking inside the bound element', async () => {
    const onClickOutside = vi.fn()
    const user = userEvent.setup()
    const inside = document.createElement('div')
    document.body.append(inside)
    const { result } = renderHook(() => useClickOutside(onClickOutside))
    result.current(inside)

    await user.click(inside)

    expect(onClickOutside).not.toHaveBeenCalled()
  })

  test('does not fire after unmount', async () => {
    const onClickOutside = vi.fn()
    const user = userEvent.setup()
    const inside = document.createElement('div')
    document.body.append(inside)
    const { result, unmount } = renderHook(() => useClickOutside(onClickOutside))
    result.current(inside)
    unmount()

    await user.click(document.body)

    expect(onClickOutside).not.toHaveBeenCalled()
  })

  test('does not fire when no element is bound', async () => {
    const onClickOutside = vi.fn()
    const user = userEvent.setup()
    renderHook(() => useClickOutside(onClickOutside))

    await user.click(document.body)

    expect(onClickOutside).not.toHaveBeenCalled()
  })
})
