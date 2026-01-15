import React from 'react'
import { useApiV2PokemonRetrieve, useApiV2PokemonList } from '../../../generated/pokeapi'

export function usePokemonSearch() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [pokemonName, setPokemonName] = React.useState<string | null>(null)

  // Fetch all pokemon names for autocomplete
  const { data: pokemonList } = useApiV2PokemonList({ limit: 2000 })

  const { data, isLoading, error } = useApiV2PokemonRetrieve(pokemonName || '', {
    query: {
      enabled: !!pokemonName
    }
  })

  const suggestions = React.useMemo(() => {
    if (!searchTerm || searchTerm.length < 2 || !pokemonList?.data?.results) return []

    const lowerTerm = searchTerm.toLowerCase()
    return pokemonList.data.results
      .filter((p) => p.name.toLowerCase().includes(lowerTerm))
      .slice(0, 10) // Limit to 10 suggestions
      .map((p) => p.name)
  }, [searchTerm, pokemonList])

  const handleSearch = React.useCallback(
    (e: React.FormEvent | string) => {
      if (typeof e !== 'string') {
        e.preventDefault()
      }

      const termToSearch = typeof e === 'string' ? e : searchTerm

      if (termToSearch.trim()) {
        const cleanedTerm = termToSearch.trim().toLowerCase()
        setSearchTerm(cleanedTerm) // Ensure input reflects the searched term if clicked
        setPokemonName(cleanedTerm)
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
    suggestions,
    handleSearch,
    handleSearchTermChange
  }
}
