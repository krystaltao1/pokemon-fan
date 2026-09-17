import withId from '@utils/withId'
import withoutId from '@utils/withoutId'
import hasFavorite from '../hasFavorite'

const toggle = (favorites: number[], pokemonId: number) =>
  hasFavorite(favorites, pokemonId) ? withoutId(favorites, pokemonId) : withId(favorites, pokemonId)

export default toggle
