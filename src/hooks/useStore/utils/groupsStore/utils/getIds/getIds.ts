import type parse from '../../../parse'

type Group = NonNullable<ReturnType<typeof parse>>['groups'][number]

const getIds = (groups: Group[], pokemonId: number) =>
  groups.filter((group) => group.pokemonIds.includes(pokemonId)).map((group) => group.id)

export default getIds
