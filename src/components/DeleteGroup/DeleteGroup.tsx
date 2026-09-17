import { useState, type FC } from 'react'
import Button from '@components/Button'
import Dialog from '@components/Dialog'
import useGroups from '@hooks/useGroups'

interface Props {
  group: { id: string; name: string }
}

const DeleteGroup: FC<Props> = ({ group }) => {
  const { deleteGroup } = useGroups()
  const [isOpen, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <>
      <Button color="danger" onClick={() => setOpen(true)}>
        Delete group
      </Button>
      <Dialog
        isOpen={isOpen}
        title="Delete group"
        submitLabel="Delete"
        submitColor="danger"
        onSubmit={() => {
          deleteGroup(group.id)
          close()
        }}
        onClose={close}
      >
        <p>Delete “{group.name}”? Favorites are not affected.</p>
      </Dialog>
    </>
  )
}

export default DeleteGroup
