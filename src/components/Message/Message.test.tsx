import { render, screen } from '@testing-library/react'
import Message from './Message'

describe('Message', () => {
  test.each([
    { color: undefined, isAlert: false },
    { color: 'info', isAlert: false },
    { color: 'error', isAlert: true },
  ] as const)('renders color $color with alert role: $isAlert', ({ color, isAlert }) => {
    render(<Message color={color}>Something happened</Message>)

    expect(screen.getByText('Something happened')).toBeInTheDocument()
    expect(screen.queryByRole('alert') !== null).toBe(isAlert)
  })

  test('renders the action after the text', () => {
    render(<Message action={<button>Retry</button>}>Failed</Message>)

    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument()
  })
})
