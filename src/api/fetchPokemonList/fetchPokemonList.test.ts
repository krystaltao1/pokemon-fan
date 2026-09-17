import requestPokemon from '../utils/requestPokemon'
import fetchPokemonList from './fetchPokemonList'

vi.mock('../utils/requestPokemon')
const requestPokemonMock = vi.mocked(requestPokemon)

describe('fetchPokemonList', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('fetches every detail from the list and maps it to a pokemon', async () => {
    requestPokemonMock.pokemonList.mockResolvedValue({
      results: [
        { name: 'bulbasaur', url: 'url/1' },
        { name: 'charmander', url: 'url/4' },
      ],
    })
    requestPokemonMock.pokemon
      .mockResolvedValueOnce({
        id: 1,
        name: 'bulbasaur',
        sprites: {
          front_default: 'bulbasaur.png',
          other: { 'official-artwork': { front_default: 'bulbasaur-art.png' } },
        },
        types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
      })
      .mockResolvedValueOnce({
        id: 4,
        name: 'charmander',
        sprites: {
          front_default: 'charmander.png',
          other: { 'official-artwork': { front_default: 'charmander-art.png' } },
        },
        types: [{ type: { name: 'fire' } }],
      })

    await expect(fetchPokemonList()).resolves.toEqual([
      { id: 1, name: 'bulbasaur', image: 'bulbasaur-art.png', types: ['grass', 'poison'] },
      { id: 4, name: 'charmander', image: 'charmander-art.png', types: ['fire'] },
    ])
    expect(requestPokemon.pokemonList).toHaveBeenCalledTimes(1)
    expect(requestPokemon.pokemon).toHaveBeenCalledWith('url/1')
    expect(requestPokemon.pokemon).toHaveBeenCalledWith('url/4')
  })

  test.each([
    {
      label: 'official artwork is null',
      sprites: { front_default: 'front.png', other: { 'official-artwork': { front_default: null } } },
      image: 'front.png',
    },
    {
      label: 'official artwork is missing',
      sprites: { front_default: 'front.png' },
      image: 'front.png',
    },
    {
      label: 'no sprite exists',
      sprites: { front_default: null, other: { 'official-artwork': { front_default: null } } },
      image: '',
    },
  ])('falls back when $label', async ({ sprites, image }) => {
    requestPokemonMock.pokemonList.mockResolvedValue({ results: [{ name: 'ditto', url: 'url/132' }] })
    requestPokemonMock.pokemon.mockResolvedValue({
      id: 132,
      name: 'ditto',
      sprites,
      types: [{ type: { name: 'normal' } }],
    })

    await expect(fetchPokemonList()).resolves.toEqual([{ id: 132, name: 'ditto', image, types: ['normal'] }])
  })
})
