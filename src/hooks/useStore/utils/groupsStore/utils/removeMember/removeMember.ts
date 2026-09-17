import withoutId from '@utils/withoutId'
import type parse from '../../../parse'

type Group = NonNullable<ReturnType<typeof parse>>['groups'][number]

const removeMember = (groups: Group[], groupId: string, pokemonId: number) =>
  groups.map((group) =>
    group.id === groupId ? { ...group, pokemonIds: withoutId(group.pokemonIds, pokemonId) } : group
  )

export default removeMember
