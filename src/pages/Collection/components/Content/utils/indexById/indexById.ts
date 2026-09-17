const indexById = <T extends { id: number }>(items: T[]): Map<number, T> =>
  new Map(items.map((item) => [item.id, item]))

export default indexById
