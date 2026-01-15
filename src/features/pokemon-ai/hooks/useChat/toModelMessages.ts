import { type ModelMessage } from 'ai'
import { type UiMessage } from '../../components/ChatMessage'

/**
 * Filters UiMessages to ModelMessages for the AI API.
 * - Keeps user, assistant, system roles
 * - Converts error messages to system messages with error context
 * - Filters out tool-usage messages (UI-only)
 */
export function toModelMessages(messages: UiMessage[]): ModelMessage[] {
  const result: ModelMessage[] = []

  for (const msg of messages) {
    if (msg.role === 'user') {
      result.push({ role: 'user', content: msg.content ?? 'No content' })
    } else if (msg.role === 'assistant') {
      result.push({ role: 'assistant', content: msg.content ?? 'No content' })
    } else if (msg.role === 'system') {
      result.push({ role: 'system', content: msg.content ?? 'No content' })
    } else if (msg.role === 'error') {
      // Include error context as system message so AI is aware of failures
      result.push({
        role: 'user',
        content: `Previous action failed: ${msg.content}. Please adjust your response accordingly.`
      })
    }
    // tool-usage messages are filtered out (UI-only)
  }

  return result
}
