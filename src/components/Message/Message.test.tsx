import { render, screen } from '@testing-library/react'
import Message from './Message'

describe('Message', () => {
  test('renders the text without an alert by default', () => {
    render(<Message>Something happened</Message>)

    expect(screen.getByText('Something happened')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  test('renders the action after the text', () => {
    render(<Message action={<a href="/">Go to Home</a>}>Empty</Message>)

    expect(screen.getByText('Empty')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Go to Home' })).toBeInTheDocument()
  })

  test('renders the error color as an alert', () => {
    render(<Message color="error">Something failed</Message>)

    expect(screen.getByRole('alert')).toHaveTextContent('Something failed')
  })
})
