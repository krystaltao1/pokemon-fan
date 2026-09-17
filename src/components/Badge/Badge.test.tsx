import { render, screen } from '@testing-library/react'
import Badge from './Badge'

describe('Badge', () => {
  test.each([
    { type: 'normal' },
    { type: 'fire' },
    { type: 'water' },
    { type: 'electric' },
    { type: 'grass' },
    { type: 'ice' },
    { type: 'fighting' },
    { type: 'poison' },
    { type: 'ground' },
    { type: 'flying' },
    { type: 'psychic' },
    { type: 'bug' },
    { type: 'rock' },
    { type: 'ghost' },
    { type: 'dragon' },
    { type: 'dark' },
    { type: 'steel' },
    { type: 'fairy' },
    { type: 'mystery' },
  ] as const)('renders the $type type as text', ({ type }) => {
    render(<Badge type={type} />)

    expect(screen.getByText(type)).toBeInTheDocument()
  })
})
