import groupsStore from './groupsStore'

const groups = [
  { id: 'a', name: 'Starters', pokemonIds: [1] },
  { id: 'b', name: 'Water', pokemonIds: [] },
]

describe('groupsStore', () => {
  test('exposes the groups', () => {
    expect(groupsStore(groups, vi.fn()).groups).toBe(groups)
  })

  test('returns the ids of the groups containing a pokemon', () => {
    expect(groupsStore(groups, vi.fn()).getGroupIds(1)).toEqual(['a'])
  })

  test('creates a valid group and returns the result', () => {
    const setGroups = vi.fn()

    const result = groupsStore(groups, setGroups).createGroup('Fire')

    const [update] = setGroups.mock.calls[0]
    expect(result).toEqual({ ok: true, group: expect.objectContaining({ name: 'Fire', pokemonIds: [] }) })
    expect(update(groups)).toEqual([...groups, expect.objectContaining({ name: 'Fire' })])
  })

  test('returns the message for an invalid name without updating', () => {
    const setGroups = vi.fn()

    expect(groupsStore(groups, setGroups).createGroup('Starters')).toEqual({
      ok: false,
      message: 'A group with this name already exists',
    })
    expect(setGroups).not.toHaveBeenCalled()
  })

  test('deletes a group', () => {
    const setGroups = vi.fn()

    groupsStore(groups, setGroups).deleteGroup('a')

    const [update] = setGroups.mock.calls[0]
    expect(update(groups)).toEqual([groups[1]])
  })

  test('adds a pokemon to a group', () => {
    const setGroups = vi.fn()

    groupsStore(groups, setGroups).addToGroup('b', 7)

    const [update] = setGroups.mock.calls[0]
    expect(update(groups)).toEqual([groups[0], { id: 'b', name: 'Water', pokemonIds: [7] }])
  })

  test('removes a pokemon from a group', () => {
    const setGroups = vi.fn()

    groupsStore(groups, setGroups).removeFromGroup('a', 1)

    const [update] = setGroups.mock.calls[0]
    expect(update(groups)).toEqual([{ id: 'a', name: 'Starters', pokemonIds: [] }, groups[1]])
  })
})
