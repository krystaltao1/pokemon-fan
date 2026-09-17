import create from './create'

const groups = [{ id: 'g_1', name: 'Starters', pokemonIds: [1] }]

describe('create', () => {
  test('creates a trimmed group with a unique id and no members', () => {
    expect(create(groups, '  Water  ')).toEqual({
      ok: true,
      group: { id: expect.stringMatching(/^g_\d+_[a-z0-9]+$/), name: 'Water', pokemonIds: [] },
    })
  })

  test('rejects an empty name', () => {
    expect(create(groups, '')).toEqual({ ok: false, message: 'Group name cannot be empty' })
  })

  test('rejects a whitespace-only name', () => {
    expect(create(groups, '   ')).toEqual({ ok: false, message: 'Group name cannot be empty' })
  })

  test('rejects a duplicate name', () => {
    expect(create(groups, ' Starters ')).toEqual({ ok: false, message: 'A group with this name already exists' })
  })
})
