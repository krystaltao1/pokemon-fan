import { useState, type FC, type ReactNode } from 'react'
import Button from '@components/Button'
import GroupDialog from '@components/GroupDialog'

interface Props {
  className?: string
  children?: ReactNode
}

const CreateGroup: FC<Props> = ({ className, children = '+ New group' }) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <Button className={className} onClick={() => setOpen(true)}>
        {children}
      </Button>
      <GroupDialog isOpen={isOpen} onClose={() => setOpen(false)} />
    </>
  )
}

export default CreateGroup
