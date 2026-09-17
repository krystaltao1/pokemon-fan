import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button', () => {
  test.each([{ color: 'primary' }, { color: 'secondary' }, { color: 'danger' }] as const)(
    'renders its children in the $color color',
    ({ color }) => {
      render(<Button color={color}>Click me</Button>)

      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    }
  )

  test('defaults to type button', () => {
    render(<Button>Click me</Button>)

    expect(screen.getByRole('button', { name: 'Click me' })).toHaveAttribute('type', 'button')
  })

  test('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click me</Button>)

    await user.click(screen.getByRole('button', { name: 'Click me' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  test('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Click me
      </Button>
    )

    await user.click(screen.getByRole('button', { name: 'Click me' }))

    expect(screen.getByRole('button', { name: 'Click me' })).toBeDisabled()
    expect(onClick).not.toHaveBeenCalled()
  })
})
