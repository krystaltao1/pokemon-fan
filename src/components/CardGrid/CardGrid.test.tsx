import { render, screen } from '@testing-library/react'
import CardGrid from './CardGrid'

describe('CardGrid', () => {
  test('renders its children inside a list', () => {
    render(
      <CardGrid>
        <li>First</li>
        <li>Second</li>
      </CardGrid>
    )

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
  })

  test('renders an empty list without crashing', () => {
    render(<CardGrid>{[]}</CardGrid>)

    expect(screen.getByRole('list')).toBeEmptyDOMElement()
  })
})
