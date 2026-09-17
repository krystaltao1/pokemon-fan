import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Layout from './Layout'

describe('Layout', () => {
  test('renders the header and the children inside main', () => {
    render(
      <MemoryRouter>
        <Layout>
          <p>Page content</p>
        </Layout>
      </MemoryRouter>
    )

    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveTextContent('Page content')
  })
})
