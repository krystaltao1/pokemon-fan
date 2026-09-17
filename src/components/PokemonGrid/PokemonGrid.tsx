import type { FC } from 'react'
import CardGrid from '@components/CardGrid'
import Message from '@components/Message'
import PokemonCard from '@components/PokemonCard'

interface Pokemon {
  id: number
  name: string
  image: string
  types: string[]
}

interface Props {
  pokemon: Pokemon[]
  emptyMessage: string
  onRemoveFromGroup?: (pokemonId: number) => void
}

const PokemonGrid: FC<Props> = ({ pokemon, emptyMessage, onRemoveFromGroup }) => {
  if (pokemon.length === 0) return <Message>{emptyMessage}</Message>

  return (
    <CardGrid>
      {pokemon.map((item) => (
        <li key={item.id}>
          <PokemonCard pokemon={item} onRemoveFromGroup={onRemoveFromGroup && (() => onRemoveFromGroup(item.id))} />
        </li>
      ))}
    </CardGrid>
  )
}

export default PokemonGrid
