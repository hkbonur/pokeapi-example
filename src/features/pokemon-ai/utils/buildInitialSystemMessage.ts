import { type ModelMessage } from 'ai'
import systemPrompt from '../systemPrompt.md?raw'

export function buildInitialSystemMessage(): ModelMessage {
  return {
    role: 'system',
    content: systemPrompt
  }
}
