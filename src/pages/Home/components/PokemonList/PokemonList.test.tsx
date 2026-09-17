import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useFavorites from '@hooks/useFavorites'
import useGroups from '@hooks/useGroups'
import usePokemon from '@hooks/usePokemon'
import PokemonList from './PokemonList'

vi.mock('@hooks/usePokemon')
const usePokemonMock = vi.mocked(usePokemon)

vi.mock('@hooks/useFavorites')
const useFavoritesMock = vi.mocked(useFavorites)

vi.mock('@hooks/useGroups')
const useGroupsMock = vi.mocked(useGroups)

const collectionMock = (value: object) => {
  useFavoritesMock.mockReturnValue(value as ReturnType<typeof useFavorites>)
  useGroupsMock.mockReturnValue(value as ReturnType<typeof useGroups>)
}

const store = {
  isFavorite: vi.fn(),
  toggleFavorite: vi.fn(),
  groups: [],
  getGroupIds: vi.fn(),
  addToGroup: vi.fn(),
  removeFromGroup: vi.fn(),
}

const pokemon = [
  { id: 1, name: 'bulbasaur', image: 'bulbasaur.png', types: ['grass', 'poison'] },
  { id: 2, name: 'ivysaur', image: 'ivysaur.png', types: ['grass', 'poison'] },
  { id: 3, name: 'venusaur', image: 'venusaur.png', types: ['grass', 'poison'] },
  { id: 4, name: 'charmander', image: 'charmander.png', types: ['fire'] },
  { id: 5, name: 'charmeleon', image: 'charmeleon.png', types: ['fire'] },
  { id: 6, name: 'charizard', image: 'charizard.png', types: ['fire', 'flying'] },
  { id: 7, name: 'squirtle', image: 'squirtle.png', types: ['water'] },
  { id: 8, name: 'wartortle', image: 'wartortle.png', types: ['water'] },
  { id: 9, name: 'blastoise', image: 'blastoise.png', types: ['water'] },
  { id: 10, name: 'caterpie', image: 'caterpie.png', types: ['bug'] },
  { id: 11, name: 'metapod', image: 'metapod.png', types: ['bug'] },
  { id: 12, name: 'butterfree', image: 'butterfree.png', types: ['bug', 'flying'] },
  { id: 13, name: 'weedle', image: 'weedle.png', types: ['bug', 'poison'] },
  { id: 14, name: 'kakuna', image: 'kakuna.png', types: ['bug', 'poison'] },
  { id: 15, name: 'beedrill', image: 'beedrill.png', types: ['bug', 'poison'] },
  { id: 16, name: 'pidgey', image: 'pidgey.png', types: ['normal', 'flying'] },
  { id: 17, name: 'pidgeotto', image: 'pidgeotto.png', types: ['normal', 'flying'] },
  { id: 18, name: 'pidgeot', image: 'pidgeot.png', types: ['normal', 'flying'] },
  { id: 19, name: 'rattata', image: 'rattata.png', types: ['normal'] },
  { id: 20, name: 'raticate', image: 'raticate.png', types: ['normal'] },
  { id: 21, name: 'spearow', image: 'spearow.png', types: ['normal', 'flying'] },
  { id: 22, name: 'fearow', image: 'fearow.png', types: ['normal', 'flying'] },
  { id: 23, name: 'ekans', image: 'ekans.png', types: ['poison'] },
  { id: 24, name: 'arbok', image: 'arbok.png', types: ['poison'] },
  { id: 25, name: 'pikachu', image: 'pikachu.png', types: ['electric'] },
]

describe('PokemonList', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('shows the summary and the first page of cards', () => {
    usePokemonMock.mockReturnValue(pokemon)
    collectionMock(store)
    render(<PokemonList query="" />)

    expect(screen.getByText('25 Pokemon · Page 1 / 2')).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(20)
    expect(screen.getByRole('heading', { level: 3, name: 'bulbasaur' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 3, name: 'spearow' })).not.toBeInTheDocument()
  })

  test('shows the remaining cards after Next', async () => {
    const user = userEvent.setup()
    usePokemonMock.mockReturnValue(pokemon)
    collectionMock(store)
    render(<PokemonList query="" />)

    await user.click(screen.getByRole('button', { name: 'Next ›' }))

    expect(screen.getByText('25 Pokemon · Page 2 / 2')).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(5)
    expect(screen.getByRole('heading', { level: 3, name: 'spearow' })).toBeInTheDocument()
  })

  test('filters the cards by the query', () => {
    usePokemonMock.mockReturnValue(pokemon)
    collectionMock(store)
    render(<PokemonList query="char" />)

    expect(screen.getByText('3 Pokemon · Page 1 / 1')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'charmander' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'charmeleon' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'charizard' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next ›' })).toBeDisabled()
  })

  test('shows the no-results message for an unknown name', () => {
    usePokemonMock.mockReturnValue(pokemon)
    collectionMock(store)
    render(<PokemonList query=" zzzz " />)

    expect(screen.getByText('No Pokemon named "zzzz"')).toBeInTheDocument()
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
  })
})
