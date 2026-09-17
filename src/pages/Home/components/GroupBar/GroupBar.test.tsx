import { render, screen } from '@testing-library/react'
import useGroups from '@hooks/useGroups'
import GroupBar from './GroupBar'

vi.mock('@hooks/useGroups')
const useGroupsMock = vi.mocked(useGroups)

describe('GroupBar', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('shows the empty hint without groups', () => {
    useGroupsMock.mockReturnValue({
      groups: [],
      getGroupIds: vi.fn(),
      createGroup: vi.fn(),
      deleteGroup: vi.fn(),
      addToGroup: vi.fn(),
      removeFromGroup: vi.fn(),
    })
    render(<GroupBar />)

    expect(screen.getByRole('region', { name: 'My Groups' })).toHaveTextContent('No groups yet')
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: '+ New group' })).toBeInTheDocument()
  })

  test('shows a chip with the member count per group', () => {
    useGroupsMock.mockReturnValue({
      groups: [
        { id: 'a', name: 'Fire', pokemonIds: [4, 5] },
        { id: 'b', name: 'Water', pokemonIds: [] },
      ],
      getGroupIds: vi.fn(),
      createGroup: vi.fn(),
      deleteGroup: vi.fn(),
      addToGroup: vi.fn(),
      removeFromGroup: vi.fn(),
    })
    render(<GroupBar />)

    expect(screen.getByText('Fire (2)')).toBeInTheDocument()
    expect(screen.getByText('Water (0)')).toBeInTheDocument()
    expect(screen.queryByText('No groups yet')).not.toBeInTheDocument()
  })
})
