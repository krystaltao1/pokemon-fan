import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Navigation from './Navigation'

describe('Navigation', () => {
  test('renders a link for every page', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'My Collection' })).toHaveAttribute('href', '/collection')
  })

  test('marks Home as the current page on /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navigation />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'My Collection' })).not.toHaveAttribute('aria-current')
  })

  test('marks My Collection as the current page on /collection', () => {
    render(
      <MemoryRouter initialEntries={['/collection']}>
        <Navigation />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: 'My Collection' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current')
  })
})
