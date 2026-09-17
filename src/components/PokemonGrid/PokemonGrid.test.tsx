import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useFavorites from '@hooks/useFavorites'
import useGroups from '@hooks/useGroups'
import PokemonGrid from './PokemonGrid'

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

const pokemon = [
  { id: 1, name: 'bulbasaur', image: 'bulbasaur.png', types: ['grass', 'poison'] },
  { id: 4, name: 'charmander', image: 'charmander.png', types: ['fire'] },
]

describe('PokemonGrid', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('shows the empty message without pokemon', () => {
    collectionMock(store)
    render(<PokemonGrid pokemon={[]} emptyMessage="No favorites yet" />)

    expect(screen.getByText('No favorites yet')).toBeInTheDocument()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  test('renders a card per pokemon', () => {
    collectionMock(store)
    render(<PokemonGrid pokemon={pokemon} emptyMessage="No favorites yet" />)

    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByRole('heading', { name: 'bulbasaur' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'charmander' })).toBeInTheDocument()
    expect(screen.queryByText('No favorites yet')).not.toBeInTheDocument()
  })

  test('hides the remove buttons without onRemoveFromGroup', () => {
    collectionMock(store)
    render(<PokemonGrid pokemon={pokemon} emptyMessage="No favorites yet" />)

    expect(screen.queryByRole('button', { name: 'Remove from group' })).not.toBeInTheDocument()
  })

  test('calls onRemoveFromGroup with the id of the removed pokemon', async () => {
    const user = userEvent.setup()
    const onRemoveFromGroup = vi.fn()
    collectionMock(store)
    render(<PokemonGrid pokemon={pokemon} emptyMessage="No favorites yet" onRemoveFromGroup={onRemoveFromGroup} />)

    await user.click(screen.getAllByRole('button', { name: 'Remove from group' })[1])

    expect(onRemoveFromGroup).toHaveBeenCalledWith(4)
  })
})
