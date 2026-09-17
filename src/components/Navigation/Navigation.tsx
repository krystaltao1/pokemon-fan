import type { FC } from 'react'
import { NavLink } from 'react-router'
import { tv } from 'tailwind-variants'

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/collection', label: 'My Collection' },
]

const navigation = tv({
  base: 'rounded-md px-3 py-1.5 text-sm font-medium transition',
  variants: {
    active: {
      true: 'bg-yellow-400 text-gray-900',
      false: 'text-gray-600 hover:bg-gray-200 hover:text-gray-900',
    },
  },
  defaultVariants: { active: false },
})

const Navigation: FC = () => (
  <nav className="flex gap-2">
    {NAV_ITEMS.map(({ href, label }) => (
      <NavLink key={href} to={href} end className={({ isActive }) => navigation({ active: isActive })}>
        {label}
      </NavLink>
    ))}
  </nav>
)

export default Navigation
