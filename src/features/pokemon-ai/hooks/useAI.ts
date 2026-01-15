import React from 'react'
import { type ModelMessage } from 'ai'
import { type AIModel } from '../config/aiProvider'
import { useGenerateWithTools } from './useGenerateWithTools'

export interface UseAIOptions {
  onError: (error: Error) => void
  onSuccess: (text: string, reasoning?: string) => void
  onReasoningChunk: (chunk: string) => void
  onTextChunk: (chunk: string) => void
  onToolCall?: (toolName: string) => void
  onToolResult?: (toolName: string) => void
  onAbort?: () => void
  model: AIModel
}

export interface UseAIReturn {
  sendPrompt: (messages: ModelMessage[]) => Promise<void>
  abort: () => void
  isLoading: boolean
}

export function useAI(options: UseAIOptions): UseAIReturn {
  const { onError, onAbort, onSuccess, onReasoningChunk, onTextChunk, onToolCall, onToolResult, model } = options
  const [isLoading, setIsLoading] = React.useState(false)
  const abortControllerRef = React.useRef<AbortController>(new AbortController())
  const isAbortedRef = React.useRef(false)
  const { generateWithTools } = useGenerateWithTools(model, {
    abortSignal: abortControllerRef.current?.signal,
    onReasoningChunk,
    onTextChunk,
    onToolCall,
    onToolResult
  })

  const sendPrompt = React.useCallback(
    async (messages: ModelMessage[]) => {
      setIsLoading(true)
      isAbortedRef.current = false

      try {
        const result = await generateWithTools(messages)
        console.log('🎉 AI Generation Complete')
        onSuccess?.(result.text, result.reasoning)
      } catch (err) {
        if (isAbortedRef.current) {
          console.log('⚠️ AI Generation Aborted')
          return
        }
        console.error('❌ AI Generation Error:', err)
        onError?.(err as Error)
      } finally {
        setIsLoading(false)
      }
    },
    [generateWithTools, onError, onSuccess]
  )

  const abort = () => {
    isAbortedRef.current = true
    if (!abortControllerRef.current) return
    abortControllerRef.current.abort()
    abortControllerRef.current = new AbortController()
    onAbort?.()
  }

  return {
    sendPrompt,
    abort,
    isLoading
  }
}
