import type { FC, ReactNode } from 'react'
import Loading from '@components/Loading'
import Message from '@components/Message'
import PokemonContext from '@context/PokemonContext'
import useFetchPokemon from '@hooks/useFetchPokemon'

interface Props {
  children: ReactNode
}

const PokemonProvider: FC<Props> = ({ children }) => {
  const { pokemon, loading, error } = useFetchPokemon()

  return (
    <PokemonContext.Provider value={pokemon}>
      {loading && <Loading message="Loading Pokemon…" />}
      {error && <Message color="error">{error}</Message>}
      {!loading && !error && children}
    </PokemonContext.Provider>
  )
}

export default PokemonProvider
