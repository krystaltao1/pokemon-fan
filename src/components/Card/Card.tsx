import type { FC } from 'react'
import { tv } from 'tailwind-variants'
import Badge from '@components/Badge'
import Button from '@components/Button'
import GroupPicker from '@components/GroupPicker'

const card = tv({
  slots: {
    base: 'flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-3 shadow-sm',
    header: 'flex items-center justify-between',
    number: 'text-sm text-gray-500',
    heart: 'text-2xl leading-none transition-colors',
    picture: 'mx-auto size-24 object-contain',
    title: 'text-center font-semibold capitalize',
    badges: 'flex flex-wrap justify-center gap-1',
  },
  variants: {
    favorite: {
      true: { heart: 'text-red-500' },
      false: { heart: 'text-gray-300 hover:text-red-400' },
    },
  },
})

interface Pokemon {
  id: number
  name: string
  image: string
  types: string[]
}

interface Props {
  pokemon: Pokemon
  favorite: boolean
  onToggleFavorite: () => void
  groups: { id: string; name: string }[]
  memberGroupIds: string[]
  onToggleGroup: (groupId: string, checked: boolean) => void
  onRemoveFromGroup?: () => void
}

const Card: FC<Props> = ({
  pokemon,
  favorite,
  onToggleFavorite,
  groups,
  memberGroupIds,
  onToggleGroup,
  onRemoveFromGroup,
}) => {
  const { base, header, number, heart, picture, title, badges } = card({ favorite })

  return (
    <article className={base()}>
      <div className={header()}>
        <span className={number()}>#{pokemon.id}</span>
        <button
          type="button"
          aria-label={favorite ? 'Unfavorite' : 'Favorite'}
          aria-pressed={favorite}
          className={heart()}
          onClick={onToggleFavorite}
        >
          {favorite ? '♥' : '♡'}
        </button>
      </div>
      <img src={pokemon.image} alt={pokemon.name} loading="lazy" className={picture()} />
      <h3 className={title()}>{pokemon.name}</h3>
      <div className={badges()}>
        {pokemon.types.map((type) => (
          <Badge key={type} type={type} />
        ))}
      </div>
      <GroupPicker groups={groups} selectedIds={memberGroupIds} onToggle={onToggleGroup} />
      {onRemoveFromGroup && (
        <Button color="secondary" onClick={onRemoveFromGroup}>
          Remove from group
        </Button>
      )}
    </article>
  )
}

export default Card
