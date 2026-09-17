import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Header from './Header'

describe('Header', () => {
  test('renders the logo and the navigation', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '⚡ Pokefan' })).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
