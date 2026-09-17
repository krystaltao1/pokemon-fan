const withoutId = (ids: number[], id: number): number[] => ids.filter((existing) => existing !== id)

export default withoutId
