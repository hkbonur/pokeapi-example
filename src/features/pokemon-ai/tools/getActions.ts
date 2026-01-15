import type { Tool } from 'ai'
import type { ResultOrErrorWithSuggestion } from './types'
import { z } from 'zod'

const inputSchema = z.object({})

export const getActions: Tool = {
  description: ``,
  inputSchema,
  execute: (_params: z.infer<typeof inputSchema>): ResultOrErrorWithSuggestion => {
    return {
      success: true,
      data: {}
    }
  }
}
