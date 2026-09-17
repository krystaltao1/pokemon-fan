import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useFavorites from '@hooks/useFavorites'
import useFetchPokemon from '@hooks/useFetchPokemon'
import useGroups from '@hooks/useGroups'
import Home from './Home'

vi.mock('@hooks/useFetchPokemon')
const useFetchPokemonMock = vi.mocked(useFetchPokemon)

vi.mock('@hooks/useFavorites')
const useFavoritesMock = vi.mocked(useFavorites)

vi.mock('@hooks/useGroups')
const useGroupsMock = vi.mocked(useGroups)

const collectionMock = (value: object) => {
  useFavoritesMock.mockReturnValue(value as ReturnType<typeof useFavorites>)
  useGroupsMock.mockReturnValue(value as ReturnType<typeof useGroups>)
}

const store = {
  isFavorite: vi.fn(),
  toggleFavorite: vi.fn(),
  groups: [],
  getGroupIds: vi.fn(),
  createGroup: vi.fn(),
  deleteGroup: vi.fn(),
  addToGroup: vi.fn(),
  removeFromGroup: vi.fn(),
}

const pokemon = [
  { id: 1, name: 'bulbasaur', image: 'bulbasaur.png', types: ['grass', 'poison'] },
  { id: 4, name: 'charmander', image: 'charmander.png', types: ['fire'] },
  { id: 7, name: 'squirtle', image: 'squirtle.png', types: ['water'] },
]

describe('Home', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('renders the search bar, the group bar and the loaded list', () => {
    useFetchPokemonMock.mockReturnValue({ pokemon, loading: false, error: null })
    collectionMock(store)
    render(<Home />)

    expect(screen.getByRole('searchbox', { name: 'Search Pokemon' })).toHaveValue('')
    expect(screen.getByRole('region', { name: 'My Groups' })).toBeInTheDocument()
    expect(screen.getByText('3 Pokemon · Page 1 / 1')).toBeInTheDocument()
  })

  test('shows the loading state while the pokemon are fetched', () => {
    useFetchPokemonMock.mockReturnValue({ pokemon: [], loading: true, error: null })
    collectionMock(store)
    render(<Home />)

    expect(screen.getByRole('status')).toHaveTextContent('Loading Pokemon…')
    expect(screen.getByRole('searchbox', { name: 'Search Pokemon' })).toBeInTheDocument()
  })

  test('passes the typed query to the list', async () => {
    const user = userEvent.setup()
    useFetchPokemonMock.mockReturnValue({ pokemon, loading: false, error: null })
    collectionMock(store)
    render(<Home />)

    await user.type(screen.getByRole('searchbox', { name: 'Search Pokemon' }), 'char')

    expect(screen.getByRole('searchbox', { name: 'Search Pokemon' })).toHaveValue('char')
    expect(screen.getByText('1 Pokemon · Page 1 / 1')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'charmander' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 3, name: 'bulbasaur' })).not.toBeInTheDocument()
  })
})
