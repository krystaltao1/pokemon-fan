import type { FC } from 'react'
import Card from '@components/Card'
import useFavorites from '@hooks/useFavorites'
import useGroups from '@hooks/useGroups'

interface Pokemon {
  id: number
  name: string
  image: string
  types: string[]
}

interface Props {
  pokemon: Pokemon
  onRemoveFromGroup?: () => void
}

const PokemonCard: FC<Props> = ({ pokemon, onRemoveFromGroup }) => {
  const { isFavorite, toggleFavorite } = useFavorites()
  const { groups, getGroupIds, addToGroup, removeFromGroup } = useGroups()

  return (
    <Card
      pokemon={pokemon}
      favorite={isFavorite(pokemon.id)}
      onToggleFavorite={() => toggleFavorite(pokemon.id)}
      groups={groups}
      memberGroupIds={getGroupIds(pokemon.id)}
      onToggleGroup={(groupId, checked) =>
        checked ? addToGroup(groupId, pokemon.id) : removeFromGroup(groupId, pokemon.id)
      }
      onRemoveFromGroup={onRemoveFromGroup}
    />
  )
}

export default PokemonCard
