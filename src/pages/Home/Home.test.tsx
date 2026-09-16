import { render, screen } from '@testing-library/react'
import Home from './Home'

describe('Home', () => {
  test('renders the page heading', () => {
    render(<Home />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Home')
  })
})
