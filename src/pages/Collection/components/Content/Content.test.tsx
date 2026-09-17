import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import useFavorites from '@hooks/useFavorites'
import useGroups from '@hooks/useGroups'
import usePokemon from '@hooks/usePokemon'
import Content from './Content'

vi.mock('@hooks/usePokemon')
const usePokemonMock = vi.mocked(usePokemon)

vi.mock('@hooks/useFavorites')
const useFavoritesMock = vi.mocked(useFavorites)

vi.mock('@hooks/useGroups')
const useGroupsMock = vi.mocked(useGroups)

const collectionMock = (value: object) => {
  useFavoritesMock.mockReturnValue(value as ReturnType<typeof useFavorites>)
  useGroupsMock.mockReturnValue(value as ReturnType<typeof useGroups>)
}

const pokemon = [
  { id: 1, name: 'bulbasaur', image: 'bulbasaur.png', types: ['grass'] },
  { id: 4, name: 'charmander', image: 'charmander.png', types: ['fire'] },
  { id: 7, name: 'squirtle', image: 'squirtle.png', types: ['water'] },
]

describe('Content', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('shows the empty state with a link home when nothing is collected', () => {
    usePokemonMock.mockReturnValue(pokemon)
    collectionMock({
      favorites: [],
      isFavorite: vi.fn(),
      toggleFavorite: vi.fn(),
      groups: [],
      getGroupIds: vi.fn(),
      createGroup: vi.fn(),
      deleteGroup: vi.fn(),
      addToGroup: vi.fn(),
      removeFromGroup: vi.fn(),
    })
    render(
      <MemoryRouter>
        <Content />
      </MemoryRouter>
    )

    expect(screen.getByText('Nothing collected yet. Tap a heart on the Home page to start.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Go to Home' })).toHaveAttribute('href', '/')
    expect(screen.queryByRole('region')).not.toBeInTheDocument()
  })

  test('resolves favorite and member ids to pokemon and skips unknown ids', () => {
    usePokemonMock.mockReturnValue(pokemon)
    collectionMock({
      favorites: [7, 999],
      isFavorite: vi.fn(),
      toggleFavorite: vi.fn(),
      groups: [{ id: 'a', name: 'Starters', pokemonIds: [1, 4, 999] }],
      getGroupIds: vi.fn(),
      createGroup: vi.fn(),
      deleteGroup: vi.fn(),
      addToGroup: vi.fn(),
      removeFromGroup: vi.fn(),
    })
    render(
      <MemoryRouter>
        <Content />
      </MemoryRouter>
    )

    expect(screen.getByRole('region', { name: 'My Groups (1)' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Starters (2)' })).toHaveTextContent('bulbasaur')
    expect(screen.getByRole('region', { name: 'Starters (2)' })).toHaveTextContent('charmander')
    expect(screen.getByRole('region', { name: 'All Favorites (1)' })).toHaveTextContent('squirtle')
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  test('shows the sections when only a group exists', () => {
    usePokemonMock.mockReturnValue(pokemon)
    collectionMock({
      favorites: [],
      isFavorite: vi.fn(),
      toggleFavorite: vi.fn(),
      groups: [{ id: 'a', name: 'Starters', pokemonIds: [] }],
      getGroupIds: vi.fn(),
      createGroup: vi.fn(),
      deleteGroup: vi.fn(),
      addToGroup: vi.fn(),
      removeFromGroup: vi.fn(),
    })
    render(
      <MemoryRouter>
        <Content />
      </MemoryRouter>
    )

    expect(screen.getByRole('region', { name: 'Starters (0)' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'All Favorites (0)' })).toHaveTextContent('No favorites yet')
    expect(screen.queryByRole('link', { name: 'Go to Home' })).not.toBeInTheDocument()
  })
})
