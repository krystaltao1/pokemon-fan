import type { FC } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const badge = tv({
  base: 'rounded-full px-2 py-0.5 text-xs font-medium capitalize',
  variants: {
    type: {
      normal: 'bg-stone-200 text-stone-800',
      fire: 'bg-orange-200 text-orange-800',
      water: 'bg-blue-200 text-blue-800',
      electric: 'bg-yellow-200 text-yellow-800',
      grass: 'bg-green-200 text-green-800',
      ice: 'bg-cyan-200 text-cyan-800',
      fighting: 'bg-red-200 text-red-800',
      poison: 'bg-purple-200 text-purple-800',
      ground: 'bg-amber-200 text-amber-800',
      flying: 'bg-sky-200 text-sky-800',
      psychic: 'bg-pink-200 text-pink-800',
      bug: 'bg-lime-200 text-lime-800',
      rock: 'bg-yellow-300 text-yellow-900',
      ghost: 'bg-violet-200 text-violet-800',
      dragon: 'bg-indigo-200 text-indigo-800',
      dark: 'bg-gray-700 text-gray-100',
      steel: 'bg-slate-200 text-slate-800',
      fairy: 'bg-rose-200 text-rose-800',
      unknown: 'bg-gray-100 text-gray-500',
    },
  },
  defaultVariants: { type: 'unknown' },
})

type Type = NonNullable<VariantProps<typeof badge>['type']>

const isType = (type: string): type is Type => type in badge.variants.type

interface Props {
  type: string
}

const Badge: FC<Props> = ({ type }) => <span className={badge({ type: isType(type) ? type : 'unknown' })}>{type}</span>

export default Badge
