import type { FC } from 'react'

interface Props {
  message?: string
}

const Loading: FC<Props> = ({ message = 'Loading…' }) => (
  <div role="status" className="flex items-center justify-center gap-3 py-16 text-gray-600">
    <span
      aria-hidden="true"
      className="size-6 animate-spin rounded-full border-2 border-gray-300 border-t-yellow-400"
    />
    <span>{message}</span>
  </div>
)

export default Loading
