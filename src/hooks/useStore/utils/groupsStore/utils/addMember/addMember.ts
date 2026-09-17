import withId from '@utils/withId'
import type parse from '../../../parse'

type Group = NonNullable<ReturnType<typeof parse>>['groups'][number]

const addMember = (groups: Group[], groupId: string, pokemonId: number) =>
  groups.map((group) => (group.id === groupId ? { ...group, pokemonIds: withId(group.pokemonIds, pokemonId) } : group))

export default addMember
