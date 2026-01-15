import React from 'react'
import { type AIModel, DEFAULT_MODEL } from '../../config/aiProvider'
import { toModelMessages } from './toModelMessages'
import { useAI } from '../useAI'
import { useMessageManager } from './useMessageManager'
import { useStreamingAssistant } from './useStreamingAssistant'
import { useToolTracking } from './useToolTracking'

export interface UseChatOptions {
  model?: AIModel
}

export function useChat(options: UseChatOptions = {}) {
  const [input, setInput] = React.useState('')
  const [model, setModel] = React.useState<AIModel>(options.model || DEFAULT_MODEL)

  // Message state management
  const messageManager = useMessageManager()

  // Streaming assistant message management
  const streaming = useStreamingAssistant({
    addAssistantMessage: messageManager.addAssistantMessage,
    updateMessage: messageManager.updateMessage
  })

  // Tool usage tracking and deduplication
  const toolTracking = useToolTracking({
    addToolMessage: messageManager.addToolMessage,
    updateMessage: messageManager.updateMessage
  })

  // AI API communication
  const { sendPrompt, abort, isLoading } = useAI({
    model,
    onReasoningChunk: streaming.handleReasoningChunk,
    onTextChunk: streaming.handleTextChunk,
    onToolCall: toolTracking.handleToolCall,
    onToolResult: toolTracking.handleToolResult,
    onSuccess: () => {
      streaming.finishStreaming()
      toolTracking.reset()
    },
    onError: (error) => {
      streaming.finishStreaming()
      toolTracking.reset()
      messageManager.addErrorMessage(error.message || 'An unexpected error occurred')
    },
    onAbort: () => {
      streaming.finishStreaming(true)
      toolTracking.reset()
    }
  })

  const submit = React.useCallback(
    async (input: string) => {
      if (!input.trim()) return

      const userId = messageManager.addUserMessage(input)
      streaming.setUserMessageId(userId)
      setInput('')

      // Convert UiMessages to ModelMessages for the AI API
      // Note: we need to include the new user message that was just added
      const allMessages = [...messageManager.messages, { id: userId, role: 'user' as const, content: input }]
      const modelMessages = toModelMessages(allMessages)
      await sendPrompt(modelMessages)
    },
    [input, messageManager, streaming, sendPrompt]
  )

  const clearMessages = React.useCallback(() => {
    messageManager.setMessages([])
  }, [messageManager])

  // True when loading but assistant hasn't started streaming yet
  const isLoadingInitialResponse = isLoading && !streaming.isStreaming

  return {
    messages: messageManager.messages,
    input,
    setInput,
    model,
    setModel,
    isLoading,
    isLoadingInitialResponse,
    submit,
    abort,
    clearMessages
  }
}
