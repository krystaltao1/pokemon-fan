import { render, screen } from '@testing-library/react'
import useGroups from '@hooks/useGroups'
import Header from './Header'

vi.mock('@hooks/useGroups')
const useGroupsMock = vi.mocked(useGroups)

describe('Header', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('renders the page title with the create entry point', () => {
    useGroupsMock.mockReturnValue({
      groups: [],
      getGroupIds: vi.fn(),
      createGroup: vi.fn(),
      deleteGroup: vi.fn(),
      addToGroup: vi.fn(),
      removeFromGroup: vi.fn(),
    })
    render(<Header />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('My Collection')
    expect(screen.getByRole('button', { name: '+ New group' })).toBeInTheDocument()
  })
})
