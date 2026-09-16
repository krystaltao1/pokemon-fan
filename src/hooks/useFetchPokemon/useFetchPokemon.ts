import { useEffect, useState } from 'react'
import fetchPokemonList from '@api/fetchPokemonList'

type Pokemon = Awaited<ReturnType<typeof fetchPokemonList>>[number]

interface Result {
  pokemon: Pokemon[]
  loading: boolean
  error: string | null
}

const useFetchPokemon = () => {
  const [result, setResult] = useState<Result>({ pokemon: [], loading: true, error: null })

  useEffect(() => {
    const load = async () => {
      try {
        const pokemon = await fetchPokemonList()
        setResult({ pokemon, loading: false, error: null })
      } catch (error) {
        setResult({ pokemon: [], loading: false, error: error instanceof Error ? error.message : 'Failed to load' })
      }
    }
    load()
  }, [])

  return result
}

export default useFetchPokemon
