import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Dialog from './Dialog'

describe('Dialog', () => {
  test('renders nothing when closed', () => {
    const onSubmit = vi.fn()
    const onClose = vi.fn()
    render(
      <Dialog isOpen={false} title="New group" submitLabel="Create" onSubmit={onSubmit} onClose={onClose}>
        <p>Body</p>
      </Dialog>
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.queryByText('Body')).not.toBeInTheDocument()
  })

  test('renders a dialog named after the title with its children', () => {
    const onSubmit = vi.fn()
    const onClose = vi.fn()
    render(
      <Dialog isOpen title="New group" submitLabel="Create" onSubmit={onSubmit} onClose={onClose}>
        <p>Body</p>
      </Dialog>
    )

    expect(screen.getByRole('dialog', { name: 'New group' })).toHaveTextContent('Body')
    expect(screen.getByRole('button', { name: 'Create' })).toHaveAttribute('type', 'submit')
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

  test('calls onSubmit when the form is submitted', async () => {
    const onSubmit = vi.fn()
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(
      <Dialog
        isOpen
        title="Delete group"
        submitLabel="Delete"
        submitColor="danger"
        onSubmit={onSubmit}
        onClose={onClose}
      >
        <p>Body</p>
      </Dialog>
    )

    await user.click(screen.getByRole('button', { name: 'Delete' }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onClose).not.toHaveBeenCalled()
  })

  test('calls onClose when Cancel is clicked', async () => {
    const onSubmit = vi.fn()
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(
      <Dialog isOpen title="New group" submitLabel="Create" onSubmit={onSubmit} onClose={onClose}>
        <p>Body</p>
      </Dialog>
    )

    await user.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(onSubmit).not.toHaveBeenCalled()
  })

  test('calls onClose when clicking outside the dialog', async () => {
    const onSubmit = vi.fn()
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(
      <Dialog isOpen title="New group" submitLabel="Create" onSubmit={onSubmit} onClose={onClose}>
        <p>Body</p>
      </Dialog>
    )

    await user.click(document.body)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('does not call onClose when clicking inside the dialog', async () => {
    const onSubmit = vi.fn()
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(
      <Dialog isOpen title="New group" submitLabel="Create" onSubmit={onSubmit} onClose={onClose}>
        <p>Body</p>
      </Dialog>
    )

    await user.click(screen.getByText('Body'))

    expect(onClose).not.toHaveBeenCalled()
  })
})
