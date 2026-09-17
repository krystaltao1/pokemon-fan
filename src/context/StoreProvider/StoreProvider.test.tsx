import { render, screen } from '@testing-library/react'
import { useContext } from 'react'
import StoreContext from '@context/StoreContext'
import useStore from '@hooks/useStore'
import favoritesStore from '@hooks/useStore/utils/favoritesStore'
import groupsStore from '@hooks/useStore/utils/groupsStore'
import StoreProvider from './StoreProvider'

vi.mock('@hooks/useStore')

const consume = vi.fn()

const store = { favorites: favoritesStore([1, 4], vi.fn()), groups: groupsStore([], vi.fn()) }

const Consumer = () => {
  consume(useContext(StoreContext))
  return <p>Ready</p>
}

describe('StoreProvider', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('provides the store from useStore to its children', () => {
    vi.mocked(useStore).mockReturnValue(store)

    render(
      <StoreProvider>
        <Consumer />
      </StoreProvider>
    )

    expect(screen.getByText('Ready')).toBeInTheDocument()
    expect(consume).toHaveBeenCalledWith(store)
    expect(useStore).toHaveBeenCalledTimes(1)
  })
})
