import requestPokemon from '../utils/requestPokemon'

const fetchPokemonList = async () => {
  const list = await requestPokemon.pokemonList()
  const details = await Promise.all(list.results.map((result) => requestPokemon.pokemon(result.url)))
  return details.map(({ id, name, sprites, types }) => ({
    id,
    name,
    image: sprites.other?.['official-artwork']?.front_default ?? sprites.front_default ?? '',
    types: types.map(({ type }) => type.name),
  }))
}

export default fetchPokemonList
