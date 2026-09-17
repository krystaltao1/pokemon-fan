const withId = (ids: number[], id: number): number[] => (ids.includes(id) ? ids : [...ids, id])

export default withId
