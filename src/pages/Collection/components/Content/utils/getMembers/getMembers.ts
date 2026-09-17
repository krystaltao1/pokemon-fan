import pickByIds from '../pickByIds'

const getMembers = <T, G extends { pokemonIds: number[] }>(groups: G[], byId: Map<number, T>) =>
  groups.map(({ pokemonIds, ...group }) => ({ ...group, members: pickByIds(byId, pokemonIds) }))

export default getMembers
