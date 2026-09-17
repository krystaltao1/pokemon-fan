import { useId, useState, type FC } from 'react'
import Button from '@components/Button'
import useClickOutside from '@hooks/useClickOutside'

interface Props {
  groups: { id: string; name: string }[]
  selectedIds: string[]
  onToggle: (groupId: string, checked: boolean) => void
}

const GroupPicker: FC<Props> = ({ groups, selectedIds, onToggle }) => {
  const [open, setOpen] = useState(false)
  const ref = useClickOutside(() => setOpen(false))
  const listId = useId()

  return (
    <div ref={ref} className="relative">
      <Button
        color="secondary"
        className="w-full"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((previous) => !previous)}
      >
        Add to group ▾
      </Button>
      {open && (
        <div
          id={listId}
          className="absolute inset-x-0 z-10 mt-1 rounded-md border border-gray-200 bg-white p-2 text-sm shadow-lg"
        >
          {groups.length === 0 ? (
            <p className="text-gray-500">Create a group first</p>
          ) : (
            <ul className="flex flex-col gap-1">
              {groups.map((group) => (
                <li key={group.id}>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(group.id)}
                      onChange={(event) => onToggle(group.id, event.target.checked)}
                    />
                    <span>{group.name}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default GroupPicker
