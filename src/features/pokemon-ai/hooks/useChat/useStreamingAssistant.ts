import React from 'react'
import { type AssistantUiMessage, type UiMessage, type UserUiMessage } from '../../components/ChatMessage'

interface StreamingCallbacks {
  addAssistantMessage: (partial: Omit<AssistantUiMessage, 'id' | 'role'>) => string
  updateMessage: <T extends UiMessage>(id: string, updater: (msg: T) => Partial<T>) => void
}

/**
 * Manages the streaming state for assistant messages.
 * Handles reasoning and content chunks during AI generation.
 */
export function useStreamingAssistant(callbacks: StreamingCallbacks) {
  const assistantIdRef = React.useRef<string | null>(null)
  const userIdRef = React.useRef<string | null>(null)
  const [isStreaming, setIsStreaming] = React.useState(false)

  const handleReasoningChunk = React.useCallback(
    (chunk: string) => {
      if (!assistantIdRef.current) {
        setIsStreaming(true)
        assistantIdRef.current = callbacks.addAssistantMessage({
          content: '',
          reasoning: chunk,
          isStreamingReasoning: true
        })
      } else {
        callbacks.updateMessage<AssistantUiMessage>(assistantIdRef.current, (msg) => ({
          reasoning: (msg.reasoning || '') + chunk,
          isStreamingReasoning: true
        }))
      }
    },
    [callbacks]
  )

  const handleTextChunk = React.useCallback(
    (chunk: string) => {
      if (!assistantIdRef.current) {
        setIsStreaming(true)
        assistantIdRef.current = callbacks.addAssistantMessage({
          content: chunk,
          isStreamingContent: true
        })
      } else {
        callbacks.updateMessage<AssistantUiMessage>(assistantIdRef.current, (msg) => ({
          content: msg.content + chunk,
          isStreamingContent: true
        }))
      }
    },
    [callbacks]
  )

  const finishStreaming = React.useCallback(
    (isAborted = false) => {
      if (assistantIdRef.current) {
        callbacks.updateMessage<AssistantUiMessage>(assistantIdRef.current, () => ({
          isStreamingReasoning: false,
          isStreamingContent: false,
          isAborted
        }))
      }
      if (isAborted && userIdRef.current) {
        callbacks.updateMessage<UserUiMessage>(userIdRef.current, () => ({
          isAborted: true
        }))
      }
      assistantIdRef.current = null
      setIsStreaming(false)
    },
    [callbacks]
  )

  const setUserMessageId = React.useCallback((id: string) => {
    userIdRef.current = id
  }, [])

  return {
    isStreaming,
    handleReasoningChunk,
    handleTextChunk,
    finishStreaming,
    setUserMessageId
  }
}
