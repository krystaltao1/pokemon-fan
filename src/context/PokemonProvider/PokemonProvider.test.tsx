import { render, screen } from '@testing-library/react'
import { useContext } from 'react'
import PokemonContext from '@context/PokemonContext'
import useFetchPokemon from '@hooks/useFetchPokemon'
import PokemonProvider from './PokemonProvider'

vi.mock('@hooks/useFetchPokemon')

const useFetchPokemonMock = vi.mocked(useFetchPokemon)

const Consumer = () => (
  <p>
    {useContext(PokemonContext)
      ?.map((item) => item.name)
      .join(',')}
  </p>
)

const renderProvider = () =>
  render(
    <PokemonProvider>
      <Consumer />
    </PokemonProvider>,
  )

describe('PokemonProvider', () => {
  test('shows the loading state while fetching', () => {
    useFetchPokemonMock.mockReturnValue({ pokemon: [], loading: true, error: null })

    renderProvider()

    expect(screen.getByRole('status')).toHaveTextContent('Loading Pokemon…')
    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument()
  })

  test('shows the error when fetching failed', () => {
    useFetchPokemonMock.mockReturnValue({ pokemon: [], loading: false, error: 'Network down' })

    renderProvider()

    expect(screen.getByRole('alert')).toHaveTextContent('Network down')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  test('provides the pokemon to its children once loaded', () => {
    useFetchPokemonMock.mockReturnValue({
      pokemon: [{ id: 1, name: 'bulbasaur', image: 'bulbasaur.png', types: ['grass'] }],
      loading: false,
      error: null,
    })

    renderProvider()

    expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
