import { render, screen } from '@testing-library/react'
import { useContext } from 'react'
import PokemonContext from '@context/PokemonContext'
import useFetchPokemon from '@hooks/useFetchPokemon'
import PokemonProvider from './PokemonProvider'

vi.mock('@hooks/useFetchPokemon')
const useFetchPokemonMock = vi.mocked(useFetchPokemon)

const consume = vi.fn()

const pokemon = [{ id: 1, name: 'bulbasaur', image: 'bulbasaur.png', types: ['grass'] }]

const Consumer = () => {
  consume(useContext(PokemonContext))
  return <p>Ready</p>
}

describe('PokemonProvider', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('shows the loading state while fetching', () => {
    useFetchPokemonMock.mockReturnValue({ pokemon: [], loading: true, error: null })

    render(
      <PokemonProvider>
        <Consumer />
      </PokemonProvider>
    )

    expect(screen.getByRole('status')).toHaveTextContent('Loading Pokemon…')
    expect(screen.queryByText('Ready')).not.toBeInTheDocument()
  })

  test('shows the error when fetching failed', () => {
    useFetchPokemonMock.mockReturnValue({ pokemon: [], loading: false, error: 'Network down' })

    render(
      <PokemonProvider>
        <Consumer />
      </PokemonProvider>
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Network down')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(screen.queryByText('Ready')).not.toBeInTheDocument()
  })

  test('provides the pokemon to its children once loaded', () => {
    useFetchPokemonMock.mockReturnValue({ pokemon, loading: false, error: null })

    render(
      <PokemonProvider>
        <Consumer />
      </PokemonProvider>
    )

    expect(screen.getByText('Ready')).toBeInTheDocument()
    expect(consume).toHaveBeenCalledWith(pokemon)
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
