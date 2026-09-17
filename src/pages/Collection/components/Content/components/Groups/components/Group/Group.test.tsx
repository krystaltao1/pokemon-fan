import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useFavorites from '@hooks/useFavorites'
import useGroups from '@hooks/useGroups'
import Group from './Group'

vi.mock('@hooks/useFavorites')
const useFavoritesMock = vi.mocked(useFavorites)

vi.mock('@hooks/useGroups')
const useGroupsMock = vi.mocked(useGroups)

const collectionMock = (value: object) => {
  useFavoritesMock.mockReturnValue(value as ReturnType<typeof useFavorites>)
  useGroupsMock.mockReturnValue(value as ReturnType<typeof useGroups>)
}

const removeFromGroup = vi.fn()

const store = {
  isFavorite: vi.fn(),
  toggleFavorite: vi.fn(),
  groups: [],
  getGroupIds: vi.fn(),
  createGroup: vi.fn(),
  deleteGroup: vi.fn(),
  addToGroup: vi.fn(),
  removeFromGroup,
}

const group = {
  id: 'g1',
  name: 'Starters',
  members: [
    { id: 1, name: 'bulbasaur', image: 'bulbasaur.png', types: ['grass'] },
    { id: 4, name: 'charmander', image: 'charmander.png', types: ['fire'] },
  ],
}

describe('Group', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('renders the group as a titled section with its members and a delete action', () => {
    collectionMock(store)
    render(<Group group={group} />)

    expect(screen.getByRole('region', { name: 'Starters (2)' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Starters (2)' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Delete group' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'bulbasaur' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'charmander' })).toBeInTheDocument()
  })

  test('shows the empty hint for a group without members', () => {
    collectionMock(store)
    render(<Group group={{ id: 'g2', name: 'Empty', members: [] }} />)

    expect(screen.getByRole('region', { name: 'Empty (0)' })).toHaveTextContent(
      'This group is empty. Add some Pokemon from Home or from your favorites below.'
    )
  })

  test('removes the clicked member from this group', async () => {
    const user = userEvent.setup()
    collectionMock(store)
    render(<Group group={group} />)

    await user.click(screen.getAllByRole('button', { name: 'Remove from group' })[1])

    expect(removeFromGroup).toHaveBeenCalledWith('g1', 4)
  })
})
