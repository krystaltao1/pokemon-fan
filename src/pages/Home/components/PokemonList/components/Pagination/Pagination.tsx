import type { FC } from 'react'
import Button from '@components/Button'

interface Props {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

const Pagination: FC<Props> = ({ page, totalPages, onChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-2">
      <Button color="secondary" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        ‹ Previous
      </Button>
      {pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          color={pageNumber === page ? 'primary' : 'secondary'}
          aria-current={pageNumber === page ? 'page' : undefined}
          onClick={() => onChange(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}
      <Button color="secondary" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
        Next ›
      </Button>
    </nav>
  )
}

export default Pagination
