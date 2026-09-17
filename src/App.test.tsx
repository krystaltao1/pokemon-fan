import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import useFetchPokemon from '@hooks/useFetchPokemon'
import App from './App'

vi.mock('@hooks/useFetchPokemon')
const useFetchPokemonMock = vi.mocked(useFetchPokemon)

describe('App', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('renders the Home page on /', () => {
    useFetchPokemonMock.mockReturnValue({ pokemon: [], loading: true, error: null })
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByRole('searchbox', { name: 'Search Pokemon' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page')
  })

  test('renders the Collection page on /collection', () => {
    useFetchPokemonMock.mockReturnValue({ pokemon: [], loading: true, error: null })
    render(
      <MemoryRouter initialEntries={['/collection']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('My Collection')
  })

  test('switches to the Home page through the navigation', async () => {
    const user = userEvent.setup()
    useFetchPokemonMock.mockReturnValue({ pokemon: [], loading: true, error: null })
    render(
      <MemoryRouter initialEntries={['/collection']}>
        <App />
      </MemoryRouter>
    )

    await user.click(screen.getByRole('link', { name: 'Home' }))

    expect(screen.getByRole('searchbox', { name: 'Search Pokemon' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page')
  })
})
