import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Logo from './Logo'

describe('Logo', () => {
  test('renders a link to the home page', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: '⚡ Pokefan' })).toHaveAttribute('href', '/')
  })
})
