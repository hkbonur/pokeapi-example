import { nanoid } from 'nanoid'
import React from 'react'
import {
  type AssistantUiMessage,
  type ErrorUiMessage,
  type ToolUsageUiMessage,
  type UiMessage,
  type UserUiMessage
} from '../../components/ChatMessage'

/**
 * Manages the chat message list state.
 * Provides helpers to add and update messages of different types.
 */
export function useMessageManager() {
  const [messages, setMessages] = React.useState<UiMessage[]>([])

  const updateMessage = React.useCallback(<T extends UiMessage>(id: string, updater: (msg: T) => Partial<T>) => {
    setMessages((prev) => prev.map((msg) => (msg.id === id ? { ...msg, ...updater(msg as T) } : msg)))
  }, [])

  const addMessage = React.useCallback(<T extends UiMessage>(message: Omit<T, 'id'>) => {
    const id = nanoid()
    setMessages((prev) => [...prev, { ...message, id } as T])
    return id
  }, [])

  const addUserMessage = React.useCallback(
    (content: string) => {
      return addMessage<UserUiMessage>({ role: 'user', content })
    },
    [addMessage]
  )

  const addAssistantMessage = React.useCallback(
    (partial: Omit<AssistantUiMessage, 'id' | 'role'>) => {
      return addMessage<AssistantUiMessage>({ role: 'assistant', ...partial })
    },
    [addMessage]
  )

  const addToolMessage = React.useCallback(
    (toolName: string) => {
      return addMessage<ToolUsageUiMessage>({ role: 'tool-usage', toolName, isExecuted: false })
    },
    [addMessage]
  )

  const addErrorMessage = React.useCallback(
    (content: string) => {
      return addMessage<ErrorUiMessage>({ role: 'error', content })
    },
    [addMessage]
  )

  return {
    messages,
    setMessages,
    updateMessage,
    addUserMessage,
    addAssistantMessage,
    addToolMessage,
    addErrorMessage
  }
}
