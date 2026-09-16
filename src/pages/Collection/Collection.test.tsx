import { render, screen } from '@testing-library/react'
import Collection from './Collection'

describe('Collection', () => {
  test('renders the page heading', () => {
    render(<Collection />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('My Collection')
  })
})
