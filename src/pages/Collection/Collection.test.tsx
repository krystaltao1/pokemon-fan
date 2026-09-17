import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import useFavorites from '@hooks/useFavorites'
import useFetchPokemon from '@hooks/useFetchPokemon'
import useGroups from '@hooks/useGroups'
import Collection from './Collection'

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
  favorites: [4],
  isFavorite: vi.fn(),
  toggleFavorite: vi.fn(),
  groups: [],
  getGroupIds: vi.fn(),
  createGroup: vi.fn(),
  deleteGroup: vi.fn(),
  addToGroup: vi.fn(),
  removeFromGroup: vi.fn(),
}

const pokemon = [{ id: 4, name: 'charmander', image: 'charmander.png', types: ['fire'] }]

describe('Collection', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('renders the header while the pokemon are loading', () => {
    useFetchPokemonMock.mockReturnValue({ pokemon: [], loading: true, error: null })
    collectionMock(store)
    render(
      <MemoryRouter>
        <Collection />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('My Collection')
    expect(screen.getByRole('button', { name: '+ New group' })).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('Loading Pokemon…')
  })

  test('renders the content once the pokemon are loaded', () => {
    useFetchPokemonMock.mockReturnValue({ pokemon, loading: false, error: null })
    collectionMock(store)
    render(
      <MemoryRouter>
        <Collection />
      </MemoryRouter>
    )

    expect(screen.getByRole('region', { name: 'All Favorites (1)' })).toHaveTextContent('charmander')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
