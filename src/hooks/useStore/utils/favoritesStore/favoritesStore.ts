import hasFavorite from './utils/hasFavorite'
import toggle from './utils/toggle'

const favoritesStore = (favorites: number[], setFavorites: (update: (prev: number[]) => number[]) => void) => {
  const isFavorite = (pokemonId: number) => hasFavorite(favorites, pokemonId)

  const toggleFavorite = (pokemonId: number) => setFavorites((prev) => toggle(prev, pokemonId))

  return { favorites, isFavorite, toggleFavorite }
}

export default favoritesStore
