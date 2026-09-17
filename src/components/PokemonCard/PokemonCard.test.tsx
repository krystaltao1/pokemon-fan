import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useFavorites from '@hooks/useFavorites'
import useGroups from '@hooks/useGroups'
import PokemonCard from './PokemonCard'

vi.mock('@hooks/useFavorites')
const useFavoritesMock = vi.mocked(useFavorites)

vi.mock('@hooks/useGroups')
const useGroupsMock = vi.mocked(useGroups)

const collectionMock = (value: object) => {
  useFavoritesMock.mockReturnValue(value as ReturnType<typeof useFavorites>)
  useGroupsMock.mockReturnValue(value as ReturnType<typeof useGroups>)
}

const isFavorite = vi.fn()
const toggleFavorite = vi.fn()
const getGroupIds = vi.fn()
const addToGroup = vi.fn()
const removeFromGroup = vi.fn()

const pokemon = { id: 4, name: 'charmander', image: 'charmander.png', types: ['fire'] }

const store = {
  isFavorite,
  toggleFavorite,
  groups: [
    { id: 'a', name: 'Starters' },
    { id: 'b', name: 'Fire' },
  ],
  getGroupIds,
  addToGroup,
  removeFromGroup,
}

describe('PokemonCard', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('shows a filled heart when the pokemon is a favorite', () => {
    isFavorite.mockReturnValue(true)
    getGroupIds.mockReturnValue([])
    collectionMock(store)
    render(<PokemonCard pokemon={pokemon} />)

    expect(isFavorite).toHaveBeenCalledWith(4)
    expect(screen.getByRole('button', { name: 'Unfavorite' })).toHaveAttribute('aria-pressed', 'true')
  })

  test('shows a hollow heart when the pokemon is not a favorite', () => {
    isFavorite.mockReturnValue(false)
    getGroupIds.mockReturnValue([])
    collectionMock(store)
    render(<PokemonCard pokemon={pokemon} />)

    expect(screen.getByRole('button', { name: 'Favorite' })).toHaveAttribute('aria-pressed', 'false')
  })

  test('toggles the favorite when the heart is clicked', async () => {
    const user = userEvent.setup()
    isFavorite.mockReturnValue(false)
    getGroupIds.mockReturnValue([])
    collectionMock(store)
    render(<PokemonCard pokemon={pokemon} />)

    await user.click(screen.getByRole('button', { name: 'Favorite' }))

    expect(toggleFavorite).toHaveBeenCalledWith(4)
  })

  test('checks the groups the pokemon belongs to', async () => {
    const user = userEvent.setup()
    isFavorite.mockReturnValue(false)
    getGroupIds.mockReturnValue(['a'])
    collectionMock(store)
    render(<PokemonCard pokemon={pokemon} />)

    await user.click(screen.getByRole('button', { name: 'Add to group ▾' }))

    expect(getGroupIds).toHaveBeenCalledWith(4)
    expect(screen.getByRole('checkbox', { name: 'Starters' })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'Fire' })).not.toBeChecked()
  })

  test('adds the pokemon to a group when it is checked', async () => {
    const user = userEvent.setup()
    isFavorite.mockReturnValue(false)
    getGroupIds.mockReturnValue(['a'])
    collectionMock(store)
    render(<PokemonCard pokemon={pokemon} />)

    await user.click(screen.getByRole('button', { name: 'Add to group ▾' }))
    await user.click(screen.getByRole('checkbox', { name: 'Fire' }))

    expect(addToGroup).toHaveBeenCalledWith('b', 4)
    expect(removeFromGroup).not.toHaveBeenCalled()
  })

  test('removes the pokemon from a group when it is unchecked', async () => {
    const user = userEvent.setup()
    isFavorite.mockReturnValue(false)
    getGroupIds.mockReturnValue(['a'])
    collectionMock(store)
    render(<PokemonCard pokemon={pokemon} />)

    await user.click(screen.getByRole('button', { name: 'Add to group ▾' }))
    await user.click(screen.getByRole('checkbox', { name: 'Starters' }))

    expect(removeFromGroup).toHaveBeenCalledWith('a', 4)
    expect(addToGroup).not.toHaveBeenCalled()
  })

  test('forwards onRemoveFromGroup to the card', async () => {
    const user = userEvent.setup()
    const onRemoveFromGroup = vi.fn()
    isFavorite.mockReturnValue(false)
    getGroupIds.mockReturnValue([])
    collectionMock(store)
    render(<PokemonCard pokemon={pokemon} onRemoveFromGroup={onRemoveFromGroup} />)

    await user.click(screen.getByRole('button', { name: 'Remove from group' }))

    expect(onRemoveFromGroup).toHaveBeenCalledTimes(1)
  })

  test('hides the remove button without onRemoveFromGroup', () => {
    isFavorite.mockReturnValue(false)
    getGroupIds.mockReturnValue([])
    collectionMock(store)
    render(<PokemonCard pokemon={pokemon} />)

    expect(screen.queryByRole('button', { name: 'Remove from group' })).not.toBeInTheDocument()
  })
})
