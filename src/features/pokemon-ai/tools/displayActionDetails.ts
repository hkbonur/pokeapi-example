import type { Tool } from 'ai'
import { apiV2MoveRetrieve } from '../../../generated/pokeapi'
import type { ResultOrErrorWithSuggestion } from './types'
import { z } from 'zod'

const inputSchema = z.object({
  actionName: z.string().describe('The name of the move/action to get details for')
})

export const displayActionDetails: Tool = {
  description: `Get details for a specific pokemon action (move)`,
  inputSchema,
  execute: async ({ actionName }: z.infer<typeof inputSchema>): Promise<ResultOrErrorWithSuggestion> => {
    try {
      const response = await apiV2MoveRetrieve(actionName.toLowerCase())

      if ((response.status as number) === 404) {
        return {
          success: false,
          suggestion: `Notify the user and tell them that the action ${actionName} was not found`,
          error: `Action ${actionName} not found`
        }
      }

      const data = response.data
      const shortEffect = data.effect_entries?.find((e) => e.language.name === 'en')?.short_effect

      return {
        success: true,
        data: {
          name: data.name,
          accuracy: data.accuracy,
          power: data.power,
          pp: data.pp,
          type: data.type.name,
          short_effect: shortEffect,
          priority: data.priority,
          damage_class: data.damage_class?.name
        }
      }
    } catch (error) {
      return {
        success: false,
        suggestion: `Please try again once more, then abort and notify user`,
        error: `Failed to fetch details for ${actionName}: ${error}`
      }
    }
  }
}
