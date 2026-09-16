import { renderHook } from '@testing-library/react'
import { useContext } from 'react'
import PokemonContext from './PokemonContext'

describe('PokemonContext', () => {
  test('defaults to null outside a provider', () => {
    const { result } = renderHook(() => useContext(PokemonContext))

    expect(result.current).toBeNull()
  })
})
