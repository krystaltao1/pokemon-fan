import type parse from '../../../parse'

type Group = NonNullable<ReturnType<typeof parse>>['groups'][number]

const create = (groups: Group[], name: string): { ok: true; group: Group } | { ok: false; message: string } => {
  const trimmed = name.trim()
  if (!trimmed) return { ok: false, message: 'Group name cannot be empty' }
  if (groups.some((group) => group.name === trimmed))
    return { ok: false, message: 'A group with this name already exists' }
  return {
    ok: true,
    group: { id: `g_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`, name: trimmed, pokemonIds: [] },
  }
}

export default create
