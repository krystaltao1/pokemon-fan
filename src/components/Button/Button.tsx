import type { ComponentProps, FC } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'rounded-md px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    color: {
      primary: 'bg-yellow-400 text-gray-900 hover:bg-yellow-500',
      secondary: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100',
      danger: 'bg-red-600 text-white hover:bg-red-700',
    },
  },
  defaultVariants: { color: 'primary' },
})

interface Props extends Omit<ComponentProps<'button'>, 'color'>, VariantProps<typeof button> {}

const Button: FC<Props> = ({ color, className, type = 'button', ...rest }) => (
  <button type={type} className={button({ color, className })} {...rest} />
)

export default Button
