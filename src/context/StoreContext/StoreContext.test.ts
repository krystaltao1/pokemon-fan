import { renderHook } from '@testing-library/react'
import { useContext } from 'react'
import StoreContext from './StoreContext'

describe('StoreContext', () => {
  test('defaults to null outside a provider', () => {
    const { result } = renderHook(() => useContext(StoreContext))

    expect(result.current).toBeNull()
  })
})
