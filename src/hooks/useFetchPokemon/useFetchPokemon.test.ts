import { renderHook, waitFor } from '@testing-library/react'
import fetchPokemonList from '@api/fetchPokemonList'
import useFetchPokemon from './useFetchPokemon'

vi.mock('@api/fetchPokemonList')

const fetchPokemonListMock = vi.mocked(fetchPokemonList)

const pokemon = [{ id: 1, name: 'bulbasaur', image: 'bulbasaur.png', types: ['grass'] }]

describe('useFetchPokemon', () => {
  test('starts loading without data or error', () => {
    fetchPokemonListMock.mockReturnValue(new Promise(() => {}))

    const { result } = renderHook(() => useFetchPokemon())

    expect(result.current).toEqual({ pokemon: [], loading: true, error: null })
  })

  test('exposes the pokemon once loaded', async () => {
    fetchPokemonListMock.mockResolvedValue(pokemon)

    const { result } = renderHook(() => useFetchPokemon())

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current).toEqual({ pokemon, loading: false, error: null })
  })

  test('exposes the error message when loading fails', async () => {
    fetchPokemonListMock.mockRejectedValue(new Error('Network down'))

    const { result } = renderHook(() => useFetchPokemon())

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current).toEqual({ pokemon: [], loading: false, error: 'Network down' })
  })

  test('uses a generic message for a non-Error failure', async () => {
    fetchPokemonListMock.mockRejectedValue('boom')

    const { result } = renderHook(() => useFetchPokemon())

    await waitFor(() => expect(result.current.error).toBe('Failed to load'))
  })
})
