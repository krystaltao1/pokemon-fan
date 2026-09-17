import { useState } from 'react'
import paginate from './utils/paginate'

const usePagination = <T>(items: T[], pageSize: number) => {
  const [page, setPage] = useState(1)
  const [pagedItems, setPagedItems] = useState(items)

  if (items !== pagedItems) {
    setPagedItems(items)
    setPage(1)
  }

  const { items: pageItems, totalPages } = paginate(items, page, pageSize)

  return { page, setPage, pageItems, totalPages }
}

export default usePagination
