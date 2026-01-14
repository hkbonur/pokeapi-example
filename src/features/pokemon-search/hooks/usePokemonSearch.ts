import React from 'react'
import { useApiV2PokemonRetrieve } from '../../../generated/pokeapi'

export function usePokemonSearch() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [pokemonName, setPokemonName] = React.useState<string | null>(null)

  const { data, isLoading, error } = useApiV2PokemonRetrieve(pokemonName || '', {
    query: {
      enabled: !!pokemonName
    }
  })

  const handleSearch = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (searchTerm.trim()) {
        setPokemonName(searchTerm.trim().toLowerCase())
      }
    },
    [searchTerm]
  )

  const handleSearchTermChange = React.useCallback((value: string) => {
    setSearchTerm(value)
  }, [])

  return {
    searchTerm,
    pokemonName,
    pokemon: data?.data,
    isLoading,
    error,
    handleSearch,
    handleSearchTermChange
  }
}
