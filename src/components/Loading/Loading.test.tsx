import { render, screen } from '@testing-library/react'
import Loading from './Loading'

describe('Loading', () => {
  test('renders the default message as a status', () => {
    render(<Loading />)

    expect(screen.getByRole('status')).toHaveTextContent('Loading…')
  })

  test('renders a custom message', () => {
    render(<Loading message="Loading Pokemon…" />)

    expect(screen.getByRole('status')).toHaveTextContent('Loading Pokemon…')
  })
})
