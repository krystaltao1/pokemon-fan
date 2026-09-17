const pickByIds = <T>(byId: Map<number, T>, ids: number[]): T[] =>
  ids.map((id) => byId.get(id)).filter((item): item is T => item !== undefined)

export default pickByIds
