import { act } from 'react'
import useFetchPokemon from '@hooks/useFetchPokemon'

vi.mock('@hooks/useFetchPokemon')
const useFetchPokemonMock = vi.mocked(useFetchPokemon)

describe('main', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('mounts the app into #root', async () => {
    useFetchPokemonMock.mockReturnValue({ pokemon: [], loading: true, error: null })
    const root = document.createElement('div')
    root.id = 'root'
    document.body.appendChild(root)

    await act(async () => {
      await import('./main')
    })

    expect(root.querySelector('nav')).not.toBeNull()
    expect(root.querySelector('[role="searchbox"]')).toHaveAttribute('aria-label', 'Search Pokemon')
  })
})
