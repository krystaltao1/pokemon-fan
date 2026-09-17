import type parse from '../../../parse'

type Group = NonNullable<ReturnType<typeof parse>>['groups'][number]

const remove = (groups: Group[], groupId: string) => groups.filter((group) => group.id !== groupId)

export default remove
