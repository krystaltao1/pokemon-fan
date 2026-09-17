import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useGroups from '@hooks/useGroups'
import DeleteGroup from './DeleteGroup'

vi.mock('@hooks/useGroups')
const useGroupsMock = vi.mocked(useGroups)

const deleteGroup = vi.fn()

const store = {
  groups: [],
  getGroupIds: vi.fn(),
  createGroup: vi.fn(),
  deleteGroup,
  addToGroup: vi.fn(),
  removeFromGroup: vi.fn(),
}

const group = { id: 'g1', name: 'Starters' }

describe('DeleteGroup', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('keeps the dialog hidden by default', () => {
    useGroupsMock.mockReturnValue(store)
    render(<DeleteGroup group={group} />)

    expect(screen.getByRole('button', { name: 'Delete group' })).toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('opens the confirmation when clicked', async () => {
    const user = userEvent.setup()
    useGroupsMock.mockReturnValue(store)
    render(<DeleteGroup group={group} />)

    await user.click(screen.getByRole('button', { name: 'Delete group' }))

    expect(screen.getByRole('dialog', { name: 'Delete group' })).toHaveTextContent(
      'Delete “Starters”? Favorites are not affected.'
    )
  })

  test('deletes the group and closes when confirmed', async () => {
    const user = userEvent.setup()
    useGroupsMock.mockReturnValue(store)
    render(<DeleteGroup group={group} />)

    await user.click(screen.getByRole('button', { name: 'Delete group' }))
    await user.click(screen.getByRole('button', { name: 'Delete' }))

    expect(deleteGroup).toHaveBeenCalledWith('g1')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('keeps the group when cancelled', async () => {
    const user = userEvent.setup()
    useGroupsMock.mockReturnValue(store)
    render(<DeleteGroup group={group} />)

    await user.click(screen.getByRole('button', { name: 'Delete group' }))
    await user.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(deleteGroup).not.toHaveBeenCalled()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
