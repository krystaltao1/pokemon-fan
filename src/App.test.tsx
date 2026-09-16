import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  test('renders the heading', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Pokefan')
  })
})
