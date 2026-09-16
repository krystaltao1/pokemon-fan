import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import App from './App'

describe('App', () => {
  test('renders the Collection page on /collection', () => {
    render(
      <MemoryRouter initialEntries={['/collection']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('My Collection')
  })

  test('switches to the Home page through the navigation', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/collection']}>
        <App />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('link', { name: 'Home' }))

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Home')
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page')
  })
})
