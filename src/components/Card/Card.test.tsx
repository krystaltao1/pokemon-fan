import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Card from './Card'

const pokemon = { id: 25, name: 'pikachu', image: 'pikachu.png', types: ['electric', 'fairy'] }

const groups = [
  { id: 'g1', name: 'Starters' },
  { id: 'g2', name: 'Legendaries' },
]

describe('Card', () => {
  test('renders the number, image, name and type badges', () => {
    const onToggleFavorite = vi.fn()
    const onToggleGroup = vi.fn()
    render(
      <Card
        pokemon={pokemon}
        favorite={false}
        onToggleFavorite={onToggleFavorite}
        groups={groups}
        memberGroupIds={[]}
        onToggleGroup={onToggleGroup}
      />
    )

    expect(screen.getByText('#25')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'pikachu' })).toHaveAttribute('src', 'pikachu.png')
    expect(screen.getByRole('heading', { level: 3, name: 'pikachu' })).toBeInTheDocument()
    expect(screen.getByText('electric')).toBeInTheDocument()
    expect(screen.getByText('fairy')).toBeInTheDocument()
  })

  test('shows a hollow heart labelled Favorite when not favorited', () => {
    const onToggleFavorite = vi.fn()
    const onToggleGroup = vi.fn()
    render(
      <Card
        pokemon={pokemon}
        favorite={false}
        onToggleFavorite={onToggleFavorite}
        groups={groups}
        memberGroupIds={[]}
        onToggleGroup={onToggleGroup}
      />
    )

    expect(screen.getByRole('button', { name: 'Favorite' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: 'Favorite' })).toHaveTextContent('♡')
  })

  test('shows a filled heart labelled Unfavorite when favorited', () => {
    const onToggleFavorite = vi.fn()
    const onToggleGroup = vi.fn()
    render(
      <Card
        pokemon={pokemon}
        favorite
        onToggleFavorite={onToggleFavorite}
        groups={groups}
        memberGroupIds={[]}
        onToggleGroup={onToggleGroup}
      />
    )

    expect(screen.getByRole('button', { name: 'Unfavorite' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Unfavorite' })).toHaveTextContent('♥')
  })

  test('calls onToggleFavorite when the heart is clicked', async () => {
    const onToggleFavorite = vi.fn()
    const onToggleGroup = vi.fn()
    const user = userEvent.setup()
    render(
      <Card
        pokemon={pokemon}
        favorite={false}
        onToggleFavorite={onToggleFavorite}
        groups={groups}
        memberGroupIds={[]}
        onToggleGroup={onToggleGroup}
      />
    )

    await user.click(screen.getByRole('button', { name: 'Favorite' }))

    expect(onToggleFavorite).toHaveBeenCalledTimes(1)
  })

  test('hides the remove button without onRemoveFromGroup', () => {
    const onToggleFavorite = vi.fn()
    const onToggleGroup = vi.fn()
    render(
      <Card
        pokemon={pokemon}
        favorite={false}
        onToggleFavorite={onToggleFavorite}
        groups={groups}
        memberGroupIds={[]}
        onToggleGroup={onToggleGroup}
      />
    )

    expect(screen.queryByRole('button', { name: 'Remove from group' })).not.toBeInTheDocument()
  })

  test('calls onRemoveFromGroup when the remove button is clicked', async () => {
    const onToggleFavorite = vi.fn()
    const onToggleGroup = vi.fn()
    const onRemoveFromGroup = vi.fn()
    const user = userEvent.setup()
    render(
      <Card
        pokemon={pokemon}
        favorite={false}
        onToggleFavorite={onToggleFavorite}
        groups={groups}
        memberGroupIds={[]}
        onToggleGroup={onToggleGroup}
        onRemoveFromGroup={onRemoveFromGroup}
      />
    )

    await user.click(screen.getByRole('button', { name: 'Remove from group' }))

    expect(onRemoveFromGroup).toHaveBeenCalledTimes(1)
  })

  test('forwards groups and membership to the group picker', async () => {
    const onToggleFavorite = vi.fn()
    const onToggleGroup = vi.fn()
    const user = userEvent.setup()
    render(
      <Card
        pokemon={pokemon}
        favorite={false}
        onToggleFavorite={onToggleFavorite}
        groups={groups}
        memberGroupIds={['g2']}
        onToggleGroup={onToggleGroup}
      />
    )

    await user.click(screen.getByRole('button', { name: 'Add to group ▾' }))
    await user.click(screen.getByRole('checkbox', { name: 'Starters' }))

    expect(screen.getByRole('checkbox', { name: 'Legendaries' })).toBeChecked()
    expect(onToggleGroup).toHaveBeenCalledWith('g1', true)
  })
})
