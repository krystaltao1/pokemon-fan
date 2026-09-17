const readStorage = <T>(key: string, initial: T, parse: (value: unknown) => T | null): T => {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return initial
    return parse(JSON.parse(raw)) ?? initial
  } catch {
    return initial
  }
}

export default readStorage
