import { act, renderHook } from '@testing-library/react'
import useStore from './useStore'

describe('useStore', () => {
  test('starts empty without writing to storage', () => {
    const { result } = renderHook(() => useStore())

    expect(result.current.favorites.favorites).toEqual([])
    expect(result.current.groups.groups).toEqual([])
    expect(localStorage.getItem('pokefan.collection')).toBeNull()
  })

  test('restores a stored collection', () => {
    localStorage.setItem(
      'pokefan.collection',
      '{"favorites":[1],"groups":[{"id":"a","name":"Starters","pokemonIds":[1]}]}'
    )

    const { result } = renderHook(() => useStore())

    expect(result.current.favorites.favorites).toEqual([1])
    expect(result.current.groups.groups).toEqual([{ id: 'a', name: 'Starters', pokemonIds: [1] }])
  })

  test('writes the key after a favorite toggle without touching groups', () => {
    const { result } = renderHook(() => useStore())

    act(() => result.current.favorites.toggleFavorite(4))

    expect(localStorage.getItem('pokefan.collection')).toBe('{"favorites":[4],"groups":[]}')
  })

  test('creates a group without touching favorites', () => {
    localStorage.setItem('pokefan.collection', '{"favorites":[1],"groups":[]}')
    const { result } = renderHook(() => useStore())

    act(() => {
      result.current.groups.createGroup('Starters')
    })

    expect(result.current.favorites.favorites).toEqual([1])
    expect(result.current.groups.groups).toEqual([expect.objectContaining({ name: 'Starters', pokemonIds: [] })])
    expect(localStorage.getItem('pokefan.collection')).toContain('"favorites":[1]')
    expect(localStorage.getItem('pokefan.collection')).toContain('"name":"Starters"')
  })

  test('deletes a group and leaves favorites alone', () => {
    localStorage.setItem(
      'pokefan.collection',
      '{"favorites":[4],"groups":[{"id":"a","name":"Starters","pokemonIds":[4]}]}'
    )
    const { result } = renderHook(() => useStore())

    act(() => result.current.groups.deleteGroup('a'))

    expect(result.current.groups.groups).toEqual([])
    expect(result.current.favorites.favorites).toEqual([4])
    expect(localStorage.getItem('pokefan.collection')).toBe('{"favorites":[4],"groups":[]}')
  })
})
