import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from './SearchBar'

describe('SearchBar', () => {
  test('renders a labelled search box with the value', () => {
    render(<SearchBar value="pika" onChange={vi.fn()} />)

    expect(screen.getByRole('searchbox', { name: 'Search Pokemon' })).toHaveValue('pika')
    expect(screen.getByPlaceholderText('🔍 Search Pokemon by name…')).toBeInTheDocument()
  })

  test('calls onChange with the typed text', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SearchBar value="cha" onChange={onChange} />)

    await user.type(screen.getByRole('searchbox', { name: 'Search Pokemon' }), 'r')

    expect(onChange).toHaveBeenCalledWith('char')
  })
})
