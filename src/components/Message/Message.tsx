import type { FC, ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const message = tv({
  base: 'flex flex-col items-center gap-3 rounded-lg px-4 py-10 text-center',
  variants: {
    color: {
      info: 'bg-white text-gray-600',
      error: 'bg-red-50 text-red-700',
    },
  },
  defaultVariants: { color: 'info' },
})

interface Props extends VariantProps<typeof message> {
  children: ReactNode
  action?: ReactNode
}

const Message: FC<Props> = ({ color, children, action }) => (
  <div role={color === 'error' ? 'alert' : undefined} className={message({ color })}>
    <p>{children}</p>
    {action}
  </div>
)

export default Message
