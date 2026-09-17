import { useId, type ComponentProps, type FC, type ReactNode } from 'react'
import Button from '@components/Button'
import useClickOutside from '@hooks/useClickOutside'

interface Props {
  isOpen: boolean
  title: string
  submitLabel: string
  submitColor?: ComponentProps<typeof Button>['color']
  onSubmit: () => void
  onClose: () => void
  children: ReactNode
}

const Dialog: FC<Props> = ({ isOpen, title, submitLabel, submitColor, onSubmit, onClose, children }) => {
  const titleId = useId()
  const ref = useClickOutside(onClose)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 p-4">
      <form
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex w-full max-w-sm flex-col gap-4 rounded-lg bg-white p-5 shadow-xl"
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
        }}
      >
        <h2 id={titleId} className="text-lg font-semibold">
          {title}
        </h2>
        {children}
        <div className="flex justify-end gap-2">
          <Button color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" color={submitColor}>
            {submitLabel}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Dialog
