import { render, screen } from '@testing-library/react'
import useFavorites from '@hooks/useFavorites'
import useGroups from '@hooks/useGroups'
import Groups from './Groups'

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

describe('Groups', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('shows the empty message without groups', () => {
    collectionMock(store)
    render(<Groups groups={[]} />)

    expect(screen.getByRole('region', { name: 'My Groups (0)' })).toHaveTextContent(
      'No groups yet. Click “+ New group” at the top right to create one.'
    )
  })

  test('renders a section per group', () => {
    collectionMock(store)
    render(
      <Groups
        groups={[
          {
            id: 'a',
            name: 'Starters',
            members: [{ id: 1, name: 'bulbasaur', image: 'bulbasaur.png', types: ['grass'] }],
          },
          { id: 'b', name: 'Water', members: [] },
        ]}
      />
    )

    expect(screen.getByRole('region', { name: 'My Groups (2)' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Starters (1)' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Water (0)' })).toBeInTheDocument()
    expect(
      screen.queryByText('No groups yet. Click “+ New group” at the top right to create one.')
    ).not.toBeInTheDocument()
  })
})
