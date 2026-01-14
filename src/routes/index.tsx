import { createFileRoute } from '@tanstack/react-router'
import { PokemonSearchPage } from '../features/pokemon-search/components/PokemonSearchPage'

export const Route = createFileRoute('/')({
  component: PokemonSearchPage
})
