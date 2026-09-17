import { render, screen } from '@testing-library/react'
import useFavorites from '@hooks/useFavorites'
import useGroups from '@hooks/useGroups'
import Favorites from './Favorites'

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
  addToGroup: vi.fn(),
  removeFromGroup: vi.fn(),
}

describe('Favorites', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('shows the empty message without favorites', () => {
    collectionMock(store)
    render(<Favorites pokemon={[]} />)

    expect(screen.getByRole('region', { name: 'All Favorites (0)' })).toHaveTextContent('No favorites yet')
  })

  test('lists a card per favorite', () => {
    collectionMock(store)
    render(
      <Favorites
        pokemon={[
          { id: 1, name: 'bulbasaur', image: 'bulbasaur.png', types: ['grass'] },
          { id: 4, name: 'charmander', image: 'charmander.png', types: ['fire'] },
        ]}
      />
    )

    expect(screen.getByRole('region', { name: 'All Favorites (2)' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'bulbasaur' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'charmander' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Remove from group' })).not.toBeInTheDocument()
  })
})
