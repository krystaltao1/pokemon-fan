import type parse from '../parse'
import addMember from './utils/addMember'
import create from './utils/create'
import getIds from './utils/getIds'
import remove from './utils/remove'
import removeMember from './utils/removeMember'

type Group = NonNullable<ReturnType<typeof parse>>['groups'][number]

const groupsStore = (groups: Group[], setGroups: (update: (prev: Group[]) => Group[]) => void) => {
  const getGroupIds = (pokemonId: number) => getIds(groups, pokemonId)

  const createGroup = (name: string) => {
    const result = create(groups, name)
    if (result.ok) setGroups((prev) => [...prev, result.group])
    return result
  }

  const deleteGroup = (groupId: string) => setGroups((prev) => remove(prev, groupId))

  const addToGroup = (groupId: string, pokemonId: number) => setGroups((prev) => addMember(prev, groupId, pokemonId))

  const removeFromGroup = (groupId: string, pokemonId: number) =>
    setGroups((prev) => removeMember(prev, groupId, pokemonId))

  return { groups, getGroupIds, createGroup, deleteGroup, addToGroup, removeFromGroup }
}

export default groupsStore
