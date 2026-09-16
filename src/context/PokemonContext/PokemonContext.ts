import { createContext } from 'react'
import type useFetchPokemon from '@hooks/useFetchPokemon'

const PokemonContext = createContext<ReturnType<typeof useFetchPokemon>['pokemon'] | null>(null)

export default PokemonContext
