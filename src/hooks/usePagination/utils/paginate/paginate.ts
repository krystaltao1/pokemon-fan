export interface Page<T> {
  items: T[]
  totalPages: number
}

const paginate = <T>(items: T[], page: number, pageSize: number): Page<T> => ({
  items: items.slice((page - 1) * pageSize, page * pageSize),
  totalPages: Math.max(1, Math.ceil(items.length / pageSize)),
})

export default paginate
