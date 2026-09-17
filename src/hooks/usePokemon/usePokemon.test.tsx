import { renderHook } from '@testing-library/react'
import PokemonContext from '@context/PokemonContext'
import usePokemon from './usePokemon'

const pokemon = [{ id: 1, name: 'bulbasaur', image: 'bulbasaur.png', types: ['grass'] }]

describe('usePokemon', () => {
  test('returns the pokemon from the provider', () => {
    const { result } = renderHook(() => usePokemon(), {
      wrapper: ({ children }) => <PokemonContext.Provider value={pokemon}>{children}</PokemonContext.Provider>,
    })

    expect(result.current).toBe(pokemon)
  })

  test('throws outside the provider', () => {
    expect(() => renderHook(() => usePokemon())).toThrow('usePokemon must be used within PokemonProvider')
  })
})
