import { useMemo, type FC } from 'react'
import { Link } from 'react-router'
import Message from '@components/Message'
import useFavorites from '@hooks/useFavorites'
import useGroups from '@hooks/useGroups'
import usePokemon from '@hooks/usePokemon'
import Favorites from './components/Favorites'
import Groups from './components/Groups'
import getMembers from './utils/getMembers'
import indexById from './utils/indexById'
import pickByIds from './utils/pickByIds'

const Content: FC = () => {
  const pokemon = usePokemon()
  const { favorites } = useFavorites()
  const { groups } = useGroups()
  const pokemonById = useMemo(() => indexById(pokemon), [pokemon])
  const favoritePokemon = pickByIds(pokemonById, favorites)
  const groupsWithMembers = getMembers(groups, pokemonById)

  if (favorites.length === 0 && groups.length === 0) {
    return (
      <Message
        action={
          <Link to="/" className="font-medium text-yellow-600 hover:underline">
            Go to Home
          </Link>
        }
      >
        Nothing collected yet. Tap a heart on the Home page to start.
      </Message>
    )
  }

  return (
    <>
      <Groups groups={groupsWithMembers} />
      <hr className="border-gray-200" />
      <Favorites pokemon={favoritePokemon} />
    </>
  )
}

export default Content
