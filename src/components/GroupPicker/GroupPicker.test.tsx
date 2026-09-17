import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GroupPicker from './GroupPicker'

const groups = [
  { id: 'g1', name: 'Starters' },
  { id: 'g2', name: 'Legendaries' },
]

describe('GroupPicker', () => {
  test('starts collapsed', () => {
    const onToggle = vi.fn()
    render(<GroupPicker groups={groups} selectedIds={[]} onToggle={onToggle} />)

    expect(screen.getByRole('button', { name: 'Add to group ▾' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
  })

  test('lists a checkbox per group checked by membership when opened', async () => {
    const onToggle = vi.fn()
    const user = userEvent.setup()
    render(<GroupPicker groups={groups} selectedIds={['g2']} onToggle={onToggle} />)

    await user.click(screen.getByRole('button', { name: 'Add to group ▾' }))

    expect(screen.getByRole('button', { name: 'Add to group ▾' })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('checkbox', { name: 'Starters' })).not.toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'Legendaries' })).toBeChecked()
  })

  test('calls onToggle with true when checking a group', async () => {
    const onToggle = vi.fn()
    const user = userEvent.setup()
    render(<GroupPicker groups={groups} selectedIds={[]} onToggle={onToggle} />)

    await user.click(screen.getByRole('button', { name: 'Add to group ▾' }))
    await user.click(screen.getByRole('checkbox', { name: 'Starters' }))

    expect(onToggle).toHaveBeenCalledWith('g1', true)
  })

  test('calls onToggle with false when unchecking a group', async () => {
    const onToggle = vi.fn()
    const user = userEvent.setup()
    render(<GroupPicker groups={groups} selectedIds={['g2']} onToggle={onToggle} />)

    await user.click(screen.getByRole('button', { name: 'Add to group ▾' }))
    await user.click(screen.getByRole('checkbox', { name: 'Legendaries' }))

    expect(onToggle).toHaveBeenCalledWith('g2', false)
  })

  test('shows a hint when there are no groups', async () => {
    const onToggle = vi.fn()
    const user = userEvent.setup()
    render(<GroupPicker groups={[]} selectedIds={[]} onToggle={onToggle} />)

    await user.click(screen.getByRole('button', { name: 'Add to group ▾' }))

    expect(screen.getByText('Create a group first')).toBeInTheDocument()
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
  })

  test('closes when clicking outside', async () => {
    const onToggle = vi.fn()
    const user = userEvent.setup()
    render(<GroupPicker groups={groups} selectedIds={[]} onToggle={onToggle} />)

    await user.click(screen.getByRole('button', { name: 'Add to group ▾' }))
    await user.click(document.body)

    expect(screen.getByRole('button', { name: 'Add to group ▾' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
  })

  test('closes when the button is clicked again', async () => {
    const onToggle = vi.fn()
    const user = userEvent.setup()
    render(<GroupPicker groups={groups} selectedIds={[]} onToggle={onToggle} />)

    await user.click(screen.getByRole('button', { name: 'Add to group ▾' }))
    await user.click(screen.getByRole('button', { name: 'Add to group ▾' }))

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
  })
})
