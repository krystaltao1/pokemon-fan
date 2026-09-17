import { render, screen } from '@testing-library/react'
import Section from './Section'

describe('Section', () => {
  test('labels the region with the title and count', () => {
    render(
      <Section heading="h2" title="My Groups" count={2}>
        <p>Content</p>
      </Section>
    )

    expect(screen.getByRole('region', { name: 'My Groups (2)' })).toHaveTextContent('Content')
  })

  test.each([
    { heading: 'h2', level: 2 },
    { heading: 'h3', level: 3 },
  ] as const)('renders the title as an $heading', ({ heading, level }) => {
    render(
      <Section heading={heading} title="Starters" count={3}>
        <p>Content</p>
      </Section>
    )

    expect(screen.getByRole('heading', { level, name: 'Starters (3)' })).toBeInTheDocument()
  })

  test('renders the action next to the heading', () => {
    render(
      <Section heading="h3" title="Starters" count={0} action={<button type="button">Delete group</button>}>
        <p>Content</p>
      </Section>
    )

    expect(screen.getByRole('button', { name: 'Delete group' })).toBeInTheDocument()
  })
})
