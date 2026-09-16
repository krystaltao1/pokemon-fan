import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Navigation from './Navigation'

const renderNavigation = (initialEntries?: string[]) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Navigation />
    </MemoryRouter>,
  )

describe('Navigation', () => {
  test('renders a link for every page', () => {
    renderNavigation()

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'My Collection' })).toHaveAttribute('href', '/collection')
  })

  test.each([
    { route: '/', active: 'Home', inactive: 'My Collection' },
    { route: '/collection', active: 'My Collection', inactive: 'Home' },
  ])('marks $active as the current page on $route', ({ route, active, inactive }) => {
    renderNavigation([route])

    expect(screen.getByRole('link', { name: active })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: inactive })).not.toHaveAttribute('aria-current')
  })
})
