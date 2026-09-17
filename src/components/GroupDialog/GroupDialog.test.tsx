import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useGroups from '@hooks/useGroups'
import GroupDialog from './GroupDialog'

vi.mock('@hooks/useGroups')
const useGroupsMock = vi.mocked(useGroups)

const createGroup = vi.fn()

const store = {
  groups: [],
  getGroupIds: vi.fn(),
  createGroup,
  deleteGroup: vi.fn(),
  addToGroup: vi.fn(),
  removeFromGroup: vi.fn(),
}

describe('GroupDialog', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('creates the group with the typed name and closes', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    createGroup.mockReturnValue({ ok: true, group: { id: 'g1', name: 'Fire', pokemonIds: [] } })
    useGroupsMock.mockReturnValue(store)
    render(<GroupDialog isOpen onClose={onClose} />)

    await user.type(screen.getByLabelText('Group name'), 'Fire')
    await user.click(screen.getByRole('button', { name: 'Create' }))

    expect(createGroup).toHaveBeenCalledWith('Fire')
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(screen.getByLabelText('Group name')).toHaveValue('')
  })

  test('shows the message and stays open when creation fails', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    createGroup.mockReturnValue({ ok: false, message: 'Group name cannot be empty' })
    useGroupsMock.mockReturnValue(store)
    render(<GroupDialog isOpen onClose={onClose} />)

    await user.click(screen.getByRole('button', { name: 'Create' }))

    expect(screen.getByRole('alert')).toHaveTextContent('⚠ Group name cannot be empty')
    expect(screen.getByRole('dialog', { name: 'New group' })).toBeInTheDocument()
    expect(onClose).not.toHaveBeenCalled()
  })

  test('clears the message when typing again', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    createGroup.mockReturnValue({ ok: false, message: 'A group with this name already exists' })
    useGroupsMock.mockReturnValue(store)
    render(<GroupDialog isOpen onClose={onClose} />)

    await user.type(screen.getByLabelText('Group name'), 'Fire')
    await user.click(screen.getByRole('button', { name: 'Create' }))
    await user.type(screen.getByLabelText('Group name'), 's')

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Group name')).toHaveValue('Fires')
  })

  test('closes without creating when Cancel is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    useGroupsMock.mockReturnValue(store)
    render(<GroupDialog isOpen onClose={onClose} />)

    await user.type(screen.getByLabelText('Group name'), 'Fire')
    await user.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(createGroup).not.toHaveBeenCalled()
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(screen.getByLabelText('Group name')).toHaveValue('')
  })

  test('renders nothing when closed', () => {
    useGroupsMock.mockReturnValue(store)
    render(<GroupDialog isOpen={false} onClose={vi.fn()} />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
