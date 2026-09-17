import { useId, useState, type FC } from 'react'
import Dialog from '@components/Dialog'
import useGroups from '@hooks/useGroups'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const GroupDialog: FC<Props> = ({ isOpen, onClose }) => {
  const { createGroup } = useGroups()
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const inputId = useId()

  const close = () => {
    setName('')
    setError(null)
    onClose()
  }

  const submit = () => {
    const created = createGroup(name)
    if (!created.ok) {
      setError(created.message)
      return
    }
    close()
  }

  return (
    <Dialog isOpen={isOpen} title="New group" submitLabel="Create" onSubmit={submit} onClose={close}>
      <div className="flex flex-col gap-1">
        <label htmlFor={inputId} className="text-sm font-medium">
          Group name
        </label>
        <input
          id={inputId}
          autoFocus
          value={name}
          onChange={(event) => {
            setName(event.target.value)
            setError(null)
          }}
          className="rounded-md border border-gray-300 px-3 py-1.5 focus:border-yellow-400 focus:outline-none"
        />
        {error && (
          <p role="alert" className="text-sm text-red-600">
            ⚠ {error}
          </p>
        )}
      </div>
    </Dialog>
  )
}

export default GroupDialog
