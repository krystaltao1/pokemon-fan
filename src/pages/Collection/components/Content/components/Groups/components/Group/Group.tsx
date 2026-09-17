import type { FC } from 'react'
import DeleteGroup from '@components/DeleteGroup'
import PokemonGrid from '@components/PokemonGrid'
import Section from '@components/Section'
import useGroups from '@hooks/useGroups'

interface Pokemon {
  id: number
  name: string
  image: string
  types: string[]
}

interface Props {
  group: { id: string; name: string; members: Pokemon[] }
}

const Group: FC<Props> = ({ group }) => {
  const { removeFromGroup } = useGroups()

  return (
    <Section heading="h3" title={group.name} count={group.members.length} action={<DeleteGroup group={group} />}>
      <PokemonGrid
        pokemon={group.members}
        emptyMessage="This group is empty. Add some Pokemon from Home or from your favorites below."
        onRemoveFromGroup={(pokemonId) => removeFromGroup(group.id, pokemonId)}
      />
    </Section>
  )
}

export default Group
