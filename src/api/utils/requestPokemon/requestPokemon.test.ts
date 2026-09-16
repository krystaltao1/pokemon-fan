import requestPokemon from './requestPokemon'

const respond = (body: unknown, status = 200) =>
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json(body, { status }))

afterEach(() => {
  vi.restoreAllMocks()
})

describe('requestPokemon', () => {
  test('requests the first 200 pokemon from the list endpoint', async () => {
    respond({ results: [] })

    await expect(requestPokemon.pokemonList()).resolves.toEqual({ results: [] })
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=200')
  })

  test('requests a pokemon detail by url', async () => {
    respond({ id: 1 })

    await expect(requestPokemon.pokemon('https://pokeapi.co/api/v2/pokemon/1/')).resolves.toEqual({ id: 1 })
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/1/')
  })

  test('throws on a non-ok response', async () => {
    respond({}, 503)

    await expect(requestPokemon.pokemonList()).rejects.toThrow(
      'Request failed (503): https://pokeapi.co/api/v2/pokemon?limit=200',
    )
  })
})
