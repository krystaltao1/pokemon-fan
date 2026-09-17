import type { FC } from 'react'
import CreateGroup from '@components/CreateGroup'
import useGroups from '@hooks/useGroups'

const GroupBar: FC = () => {
  const { groups } = useGroups()

  return (
    <section aria-label="My Groups" className="flex flex-wrap items-center gap-3 rounded-lg bg-white px-4 py-3">
      <span className="font-semibold">My Groups</span>
      {groups.length === 0 && <span className="text-sm text-gray-500">No groups yet</span>}
      <ul className="flex flex-wrap gap-2">
        {groups.map((group) => (
          <li key={group.id} className="rounded-full bg-gray-100 px-3 py-1 text-sm">
            {group.name} ({group.pokemonIds.length})
          </li>
        ))}
      </ul>
      <CreateGroup className="ml-auto" />
    </section>
  )
}

export default GroupBar
