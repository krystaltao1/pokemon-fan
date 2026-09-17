const filterByName = <T extends { name: string }>(items: T[], query: string): T[] => {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return items
  return items.filter((item) => item.name.includes(normalizedQuery))
}

export default filterByName
