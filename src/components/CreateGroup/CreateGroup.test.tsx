import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useGroups from '@hooks/useGroups'
import CreateGroup from './CreateGroup'

vi.mock('@hooks/useGroups')
const useGroupsMock = vi.mocked(useGroups)

const store = {
  groups: [],
  getGroupIds: vi.fn(),
  createGroup: vi.fn(),
  deleteGroup: vi.fn(),
  addToGroup: vi.fn(),
  removeFromGroup: vi.fn(),
}

describe('CreateGroup', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('keeps the dialog hidden by default', () => {
    useGroupsMock.mockReturnValue(store)
    render(<CreateGroup />)

    expect(screen.getByRole('button', { name: '+ New group' })).toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('opens the dialog when clicked', async () => {
    const user = userEvent.setup()
    useGroupsMock.mockReturnValue(store)
    render(<CreateGroup />)

    await user.click(screen.getByRole('button', { name: '+ New group' }))

    expect(screen.getByRole('dialog', { name: 'New group' })).toBeInTheDocument()
  })

  test('closes the dialog when it asks to close', async () => {
    const user = userEvent.setup()
    useGroupsMock.mockReturnValue(store)
    render(<CreateGroup />)

    await user.click(screen.getByRole('button', { name: '+ New group' }))
    await user.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('renders its children as the label', () => {
    useGroupsMock.mockReturnValue(store)
    render(<CreateGroup>Create one</CreateGroup>)

    expect(screen.getByRole('button', { name: 'Create one' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '+ New group' })).not.toBeInTheDocument()
  })
})
