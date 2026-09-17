import { z } from 'zod/mini'

const schema = z.object({
  favorites: z.array(z.number()),
  groups: z.array(z.object({ id: z.string(), name: z.string(), pokemonIds: z.array(z.number()) })),
})

const parse = (value: unknown) => {
  const result = schema.safeParse(value)
  return result.success ? result.data : null
}

export default parse
