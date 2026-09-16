const BASE_URL = 'https://pokeapi.co/api/v2'
const POKEMON_LIMIT = 200

interface PokemonList {
  results: { name: string; url: string }[]
}

interface PokemonDetail {
  id: number
  name: string
  sprites: { front_default: string | null; other?: { 'official-artwork'?: { front_default: string | null } } }
  types: { type: { name: string } }[]
}

const get = async <T>(url: string): Promise<T> => {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Request failed (${response.status}): ${url}`)
  return response.json()
}

const requestPokemon = {
  pokemonList: () => get<PokemonList>(`${BASE_URL}/pokemon?limit=${POKEMON_LIMIT}`),
  pokemon: (url: string) => get<PokemonDetail>(url),
}

export default requestPokemon
