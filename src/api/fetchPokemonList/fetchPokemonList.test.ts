import requestPokemon from '../utils/requestPokemon'
import fetchPokemonList from './fetchPokemonList'

vi.mock('../utils/requestPokemon')

const requestPokemonMock = vi.mocked(requestPokemon)

const detail = (id: number, name: string, sprites: Parameters<typeof toDetail>[0], types: string[]) => ({
  id,
  name,
  sprites: toDetail(sprites),
  types: types.map((type) => ({ type: { name: type } })),
})

const toDetail = (sprites: { artwork?: string | null; front?: string | null }) => ({
  front_default: sprites.front ?? null,
  ...(sprites.artwork === undefined ? {} : { other: { 'official-artwork': { front_default: sprites.artwork } } }),
})

describe('fetchPokemonList', () => {
  test('fetches every detail from the list and maps it to a pokemon', async () => {
    requestPokemonMock.pokemonList.mockResolvedValue({
      results: [
        { name: 'bulbasaur', url: 'url/1' },
        { name: 'charmander', url: 'url/4' },
      ],
    })
    requestPokemonMock.pokemon.mockImplementation(async (url) =>
      url === 'url/1'
        ? detail(1, 'bulbasaur', { artwork: 'bulbasaur-art.png', front: 'bulbasaur.png' }, ['grass', 'poison'])
        : detail(4, 'charmander', { artwork: 'charmander-art.png', front: 'charmander.png' }, ['fire']),
    )

    await expect(fetchPokemonList()).resolves.toEqual([
      { id: 1, name: 'bulbasaur', image: 'bulbasaur-art.png', types: ['grass', 'poison'] },
      { id: 4, name: 'charmander', image: 'charmander-art.png', types: ['fire'] },
    ])
    expect(requestPokemon.pokemonList).toHaveBeenCalledTimes(1)
    expect(requestPokemon.pokemon).toHaveBeenCalledWith('url/1')
    expect(requestPokemon.pokemon).toHaveBeenCalledWith('url/4')
  })

  test.each([
    { label: 'official artwork is null', sprites: { artwork: null, front: 'front.png' }, image: 'front.png' },
    { label: 'official artwork is missing', sprites: { front: 'front.png' }, image: 'front.png' },
    { label: 'no sprite exists', sprites: { artwork: null, front: null }, image: '' },
  ])('falls back when $label', async ({ sprites, image }) => {
    requestPokemonMock.pokemonList.mockResolvedValue({ results: [{ name: 'ditto', url: 'url/132' }] })
    requestPokemonMock.pokemon.mockResolvedValue(detail(132, 'ditto', sprites, ['normal']))

    await expect(fetchPokemonList()).resolves.toEqual([{ id: 132, name: 'ditto', image, types: ['normal'] }])
  })
})
