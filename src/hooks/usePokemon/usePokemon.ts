import { useContext } from 'react'
import PokemonContext from '@context/PokemonContext'

const usePokemon = () => {
  const pokemon = useContext(PokemonContext)
  if (pokemon === null) throw new Error('usePokemon must be used within PokemonProvider')
  return pokemon
}

export default usePokemon
