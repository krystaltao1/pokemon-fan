import { act } from 'react'

describe('main', () => {
  test('mounts the app into #root', async () => {
    const root = document.createElement('div')
    root.id = 'root'
    document.body.appendChild(root)

    await act(async () => {
      await import('./main')
    })

    expect(root.querySelector('h1')).toHaveTextContent('Pokefan')
  })
})
