import type { Tool } from 'ai'
import { apiV2PokemonRetrieve } from '../../../generated/pokeapi'
import type { ResultOrErrorWithSuggestion } from './types'
import { z } from 'zod'

const inputSchema = z.object({
  pokemonName: z.string().describe('The name of the pokemon to get actions for')
})

export const getActions: Tool = {
  description: `Get available actions (moves) for a given pokemon name`,
  inputSchema,
  execute: async ({ pokemonName }: z.infer<typeof inputSchema>): Promise<ResultOrErrorWithSuggestion> => {
    try {
      const response = await apiV2PokemonRetrieve(pokemonName.toLowerCase())

      if ((response.status as number) === 404) {
        return {
          success: false,
          suggestion: `Notify the user and tell them that the pokemon ${pokemonName} was not found`,
          error: `Pokemon ${pokemonName} not found`
        }
      }

      const moves = response.data.moves?.map((m) => m.move.name) || []

      return {
        success: true,
        data: {
          pokemon: pokemonName,
          moves: moves
        }
      }
    } catch (error) {
      return {
        success: false,
        error: `Failed to fetch actions for ${pokemonName}: ${error}`
      }
    }
  }
}
