import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Pagination from './Pagination'

describe('Pagination', () => {
  test('disables Previous on the first page', () => {
    render(<Pagination page={1} totalPages={3} onChange={vi.fn()} />)

    expect(screen.getByRole('button', { name: '‹ Previous' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Next ›' })).toBeEnabled()
  })

  test('disables Next on the last page', () => {
    render(<Pagination page={3} totalPages={3} onChange={vi.fn()} />)

    expect(screen.getByRole('button', { name: 'Next ›' })).toBeDisabled()
    expect(screen.getByRole('button', { name: '‹ Previous' })).toBeEnabled()
  })

  test('marks only the current page', () => {
    render(<Pagination page={2} totalPages={3} onChange={vi.fn()} />)

    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '2' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('button', { name: '1' })).not.toHaveAttribute('aria-current')
    expect(screen.getByRole('button', { name: '3' })).not.toHaveAttribute('aria-current')
  })

  test('calls onChange with the clicked page number', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Pagination page={1} totalPages={3} onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: '3' }))

    expect(onChange).toHaveBeenCalledWith(3)
  })

  test('calls onChange with the next page', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Pagination page={1} totalPages={3} onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: 'Next ›' }))

    expect(onChange).toHaveBeenCalledWith(2)
  })

  test('calls onChange with the previous page', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Pagination page={3} totalPages={3} onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: '‹ Previous' }))

    expect(onChange).toHaveBeenCalledWith(2)
  })
})
