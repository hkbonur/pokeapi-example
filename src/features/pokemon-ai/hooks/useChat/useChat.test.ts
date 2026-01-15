import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'
import { type AIModel } from '../../config/aiProvider'
import { useAI } from '../useAI'
import { useChat } from './useChat'

vi.mock('../useAI')

const mockUseAI = useAI as Mock

interface MockUseAIOptions {
  onReasoningChunk: (chunk: string) => void
  onTextChunk: (chunk: string) => void
  onToolCall: (toolName: string) => void
  onToolResult: (toolName: string) => void
  onSuccess: () => void
  onError: (error: Error) => void
  onAbort: () => void
}

describe('useChat', () => {
  let mockSendPrompt: Mock
  let mockAbort: Mock
  let capturedOptions: MockUseAIOptions

  beforeEach(() => {
    vi.clearAllMocks()
    mockSendPrompt = vi.fn().mockResolvedValue(undefined)
    mockAbort = vi.fn()

    mockUseAI.mockImplementation((options: MockUseAIOptions) => {
      capturedOptions = options
      return {
        sendPrompt: mockSendPrompt,
        abort: mockAbort,
        isLoading: false
      }
    })
  })

  describe('handleSubmit', () => {
    it('should add user message and call sendPrompt', async () => {
      const { result } = renderHook(() => useChat())

      act(() => {
        result.current.setInput('Hello AI')
      })

      await act(async () => {
        await result.current.submit('Hello AI')
      })

      expect(result.current.messages).toHaveLength(1)
      expect(result.current.messages[0]).toMatchObject({
        role: 'user',
        content: 'Hello AI'
      })
      expect(result.current.input).toBe('')
      expect(mockSendPrompt).toHaveBeenCalled()
    })

    it('should not submit if input is empty', async () => {
      const { result } = renderHook(() => useChat())

      await act(async () => {
        await result.current.submit('')
      })

      expect(result.current.messages).toHaveLength(0)
      expect(mockSendPrompt).not.toHaveBeenCalled()
    })

    it('should not submit if input is only whitespace', async () => {
      const { result } = renderHook(() => useChat())

      await act(async () => {
        await result.current.submit('   ')
      })

      expect(result.current.messages).toHaveLength(0)
      expect(mockSendPrompt).not.toHaveBeenCalled()
    })
  })

  describe('onTextChunk', () => {
    it('should create assistant message on first text chunk', () => {
      const { result } = renderHook(() => useChat())

      act(() => {
        capturedOptions.onTextChunk('Hello')
      })

      expect(result.current.messages).toHaveLength(1)
      expect(result.current.messages[0]).toMatchObject({
        role: 'assistant',
        content: 'Hello',
        isStreamingContent: true
      })
    })

    it('should append to existing assistant message on subsequent chunks', () => {
      const { result } = renderHook(() => useChat())

      act(() => {
        capturedOptions.onTextChunk('Hello')
      })

      act(() => {
        capturedOptions.onTextChunk(' world')
      })

      expect(result.current.messages).toHaveLength(1)
      expect(result.current.messages[0]).toMatchObject({
        role: 'assistant',
        content: 'Hello world',
        isStreamingContent: true
      })
    })
  })

  describe('onReasoningChunk', () => {
    it('should create assistant message with reasoning on first chunk', () => {
      const { result } = renderHook(() => useChat())

      act(() => {
        capturedOptions.onReasoningChunk('Thinking...')
      })

      expect(result.current.messages).toHaveLength(1)
      expect(result.current.messages[0]).toMatchObject({
        role: 'assistant',
        content: '',
        reasoning: 'Thinking...',
        isStreamingReasoning: true
      })
    })

    it('should append to existing reasoning on subsequent chunks', () => {
      const { result } = renderHook(() => useChat())

      act(() => {
        capturedOptions.onReasoningChunk('Thinking')
      })

      act(() => {
        capturedOptions.onReasoningChunk(' harder...')
      })

      expect(result.current.messages).toHaveLength(1)
      expect(result.current.messages[0]).toMatchObject({
        role: 'assistant',
        reasoning: 'Thinking harder...',
        isStreamingReasoning: true
      })
    })
  })

  describe('onToolCall', () => {
    it('should add tool usage message', () => {
      const { result } = renderHook(() => useChat())

      act(() => {
        capturedOptions.onToolCall('applyOperation')
      })

      expect(result.current.messages).toHaveLength(1)
      expect(result.current.messages[0]).toMatchObject({
        role: 'tool-usage',
        toolName: 'applyOperation',
        isExecuted: false
      })
    })

    it('should add tool message for each tool call', () => {
      const { result } = renderHook(() => useChat())

      act(() => {
        capturedOptions.onToolCall('applyOperation')
      })

      act(() => {
        capturedOptions.onToolCall('applyOperation')
      })

      act(() => {
        capturedOptions.onToolCall('applyOperation')
      })

      expect(result.current.messages).toHaveLength(3)
      expect(result.current.messages[0]).toMatchObject({
        role: 'tool-usage',
        toolName: 'applyOperation',
        isExecuted: true
      })
      expect(result.current.messages[1]).toMatchObject({
        role: 'tool-usage',
        toolName: 'applyOperation',
        isExecuted: true
      })
      expect(result.current.messages[2]).toMatchObject({
        role: 'tool-usage',
        toolName: 'applyOperation',
        isExecuted: false
      })
    })

    it('should add new tool message for different tools', () => {
      const { result } = renderHook(() => useChat())

      act(() => {
        capturedOptions.onToolCall('applyOperation')
      })

      act(() => {
        capturedOptions.onToolCall('getDocumentContent')
      })

      expect(result.current.messages).toHaveLength(2)
      expect(result.current.messages[0]).toMatchObject({
        role: 'tool-usage',
        toolName: 'applyOperation',
        isExecuted: true // Previous tool marked as executed
      })
      expect(result.current.messages[1]).toMatchObject({
        role: 'tool-usage',
        toolName: 'getDocumentContent',
        isExecuted: false
      })
    })

    it('should add new tool message if same tool is called after a different tool', () => {
      const { result } = renderHook(() => useChat())

      act(() => {
        capturedOptions.onToolCall('applyOperation')
      })

      act(() => {
        capturedOptions.onToolCall('getDocumentContent')
      })

      act(() => {
        capturedOptions.onToolCall('applyOperation')
      })

      expect(result.current.messages).toHaveLength(3)
      expect(result.current.messages[2]).toMatchObject({
        role: 'tool-usage',
        toolName: 'applyOperation',
        isExecuted: false
      })
    })
  })

  describe('onToolResult', () => {
    it('should mark tool message as executed', () => {
      const { result } = renderHook(() => useChat())

      act(() => {
        capturedOptions.onToolCall('applyOperation')
      })

      expect(result.current.messages[0]).toMatchObject({
        isExecuted: false
      })

      act(() => {
        capturedOptions.onToolResult('applyOperation')
      })

      expect(result.current.messages[0]).toMatchObject({
        role: 'tool-usage',
        toolName: 'applyOperation',
        isExecuted: true
      })
    })
  })

  describe('onSuccess', () => {
    it('should mark streaming as complete', () => {
      const { result } = renderHook(() => useChat())

      act(() => {
        capturedOptions.onTextChunk('Response')
      })

      expect(result.current.messages[0]).toMatchObject({
        isStreamingContent: true
      })

      act(() => {
        capturedOptions.onSuccess()
      })

      expect(result.current.messages[0]).toMatchObject({
        role: 'assistant',
        content: 'Response',
        isStreamingContent: false,
        isStreamingReasoning: false
      })
    })

    it('should mark any active tool message as executed', () => {
      const { result } = renderHook(() => useChat())

      act(() => {
        capturedOptions.onToolCall('applyOperation')
      })

      expect(result.current.messages[0]).toMatchObject({
        isExecuted: false
      })

      act(() => {
        capturedOptions.onSuccess()
      })

      expect(result.current.messages[0]).toMatchObject({
        isExecuted: true
      })
    })
  })

  describe('onError', () => {
    it('should add error message', () => {
      const { result } = renderHook(() => useChat())

      act(() => {
        capturedOptions.onError(new Error('Something went wrong'))
      })

      expect(result.current.messages).toHaveLength(1)
      expect(result.current.messages[0]).toMatchObject({
        role: 'error',
        content: 'Something went wrong'
      })
    })

    it('should mark any active tool message as executed on error', () => {
      const { result } = renderHook(() => useChat())

      act(() => {
        capturedOptions.onToolCall('applyOperation')
      })

      act(() => {
        capturedOptions.onError(new Error('Failed'))
      })

      expect(result.current.messages[0]).toMatchObject({
        role: 'tool-usage',
        isExecuted: true
      })
      expect(result.current.messages[1]).toMatchObject({
        role: 'error'
      })
    })

    it('should stop streaming on error', () => {
      const { result } = renderHook(() => useChat())

      act(() => {
        capturedOptions.onTextChunk('Partial response')
      })

      act(() => {
        capturedOptions.onError(new Error('Network error'))
      })

      expect(result.current.messages[0]).toMatchObject({
        role: 'assistant',
        isStreamingContent: false,
        isStreamingReasoning: false
      })
    })
  })

  describe('onAbort', () => {
    it('should mark assistant message as aborted', async () => {
      const { result } = renderHook(() => useChat())

      // First submit a user message
      await act(async () => {
        await result.current.submit('Test message')
      })

      // Then get a partial response
      act(() => {
        capturedOptions.onTextChunk('Partial')
      })

      // Then abort
      act(() => {
        capturedOptions.onAbort()
      })

      const assistantMessage = result.current.messages.find((m) => m.role === 'assistant')
      expect(assistantMessage).toMatchObject({
        isAborted: true,
        isStreamingContent: false,
        isStreamingReasoning: false
      })
    })

    it('should mark user message as aborted', async () => {
      const { result } = renderHook(() => useChat())

      await act(async () => {
        await result.current.submit('Test message')
      })

      act(() => {
        capturedOptions.onAbort()
      })

      const userMessage = result.current.messages.find((m) => m.role === 'user')
      expect(userMessage).toMatchObject({
        role: 'user',
        isAborted: true
      })
    })

    it('should mark any active tool message as executed on abort', () => {
      const { result } = renderHook(() => useChat())

      act(() => {
        capturedOptions.onToolCall('applyOperation')
      })

      act(() => {
        capturedOptions.onAbort()
      })

      expect(result.current.messages[0]).toMatchObject({
        role: 'tool-usage',
        isExecuted: true
      })
    })
  })

  describe('abort', () => {
    it('should expose abort function from useAI', () => {
      const { result } = renderHook(() => useChat())

      result.current.abort()

      expect(mockAbort).toHaveBeenCalled()
    })
  })

  describe('setInput', () => {
    it('should update input value', () => {
      const { result } = renderHook(() => useChat())

      act(() => {
        result.current.setInput('New input')
      })

      expect(result.current.input).toBe('New input')
    })
  })

  describe('setModel', () => {
    it('should update model', () => {
      const { result } = renderHook(() => useChat())

      const newModel: AIModel = {
        id: 'new-model',
        displayName: 'New Model',
        provider: 'google' as const,
        logo: () => null
      }

      act(() => {
        result.current.setModel(newModel)
      })

      expect(result.current.model).toEqual(newModel)
    })
  })

  describe('complex scenarios', () => {
    it('should handle full conversation flow', async () => {
      const { result } = renderHook(() => useChat())

      // User sends message
      await act(async () => {
        await result.current.submit('Hello')
      })

      // AI starts reasoning
      act(() => {
        capturedOptions.onReasoningChunk('Let me think...')
      })

      // AI calls a tool
      act(() => {
        capturedOptions.onToolCall('getDocumentContent')
      })

      // Tool completes
      act(() => {
        capturedOptions.onToolResult('getDocumentContent')
      })

      // AI starts responding
      act(() => {
        capturedOptions.onTextChunk('Here is my response')
      })

      // AI completes
      act(() => {
        capturedOptions.onSuccess()
      })

      expect(result.current.messages).toHaveLength(3)
      expect(result.current.messages[0]).toMatchObject({
        role: 'user',
        content: 'Hello'
      })
      expect(result.current.messages[1]).toMatchObject({
        role: 'assistant',
        content: 'Here is my response',
        reasoning: 'Let me think...',
        isStreamingContent: false,
        isStreamingReasoning: false
      })
      expect(result.current.messages[2]).toMatchObject({
        role: 'tool-usage',
        toolName: 'getDocumentContent',
        isExecuted: true
      })
    })

    it('should handle multiple tool calls', () => {
      const { result } = renderHook(() => useChat())

      // AI calls applyOperation 3 times consecutively
      act(() => {
        capturedOptions.onToolCall('applyOperation')
      })
      act(() => {
        capturedOptions.onToolCall('applyOperation')
      })
      act(() => {
        capturedOptions.onToolCall('applyOperation')
      })

      // Then calls a different tool
      act(() => {
        capturedOptions.onToolCall('getDocumentContent')
      })

      // Then calls applyOperation again
      act(() => {
        capturedOptions.onToolCall('applyOperation')
      })
      act(() => {
        capturedOptions.onToolCall('applyOperation')
      })

      // Success
      act(() => {
        capturedOptions.onSuccess()
      })

      // Should have 6 tool messages: 3x applyOperation, getDocumentContent, 2x applyOperation
      const toolMessages = result.current.messages.filter((m) => m.role === 'tool-usage')
      expect(toolMessages).toHaveLength(6)
      expect(toolMessages[0]).toMatchObject({ toolName: 'applyOperation', isExecuted: true })
      expect(toolMessages[1]).toMatchObject({ toolName: 'applyOperation', isExecuted: true })
      expect(toolMessages[2]).toMatchObject({ toolName: 'applyOperation', isExecuted: true })
      expect(toolMessages[3]).toMatchObject({ toolName: 'getDocumentContent', isExecuted: true })
      expect(toolMessages[4]).toMatchObject({ toolName: 'applyOperation', isExecuted: true })
      expect(toolMessages[5]).toMatchObject({ toolName: 'applyOperation', isExecuted: true })
    })

    it('should reset tool deduplication after success for next conversation', async () => {
      const { result } = renderHook(() => useChat())

      // First conversation
      await act(async () => {
        await result.current.submit('First message')
      })

      act(() => {
        capturedOptions.onToolCall('applyOperation')
      })

      act(() => {
        capturedOptions.onSuccess()
      })

      // Second conversation
      act(() => {
        result.current.setInput('Second message')
      })

      await act(async () => {
        await result.current.submit('Second message')
      })

      // Should be able to show applyOperation again
      act(() => {
        capturedOptions.onToolCall('applyOperation')
      })

      const toolMessages = result.current.messages.filter((m) => m.role === 'tool-usage')
      expect(toolMessages).toHaveLength(2)
    })

    it('should add separate tool message for each tool call even after onToolResult', () => {
      const { result } = renderHook(() => useChat())

      // Call tool, then result, then same tool again
      act(() => {
        capturedOptions.onToolCall('applyOperation')
      })

      act(() => {
        capturedOptions.onToolResult('applyOperation')
      })

      // Same tool called again - should create new message
      act(() => {
        capturedOptions.onToolCall('applyOperation')
      })

      act(() => {
        capturedOptions.onToolResult('applyOperation')
      })

      // Same tool called again - should create another new message
      act(() => {
        capturedOptions.onToolCall('applyOperation')
      })

      const toolMessages = result.current.messages.filter((m) => m.role === 'tool-usage')
      expect(toolMessages).toHaveLength(3)
      expect(toolMessages[0]).toMatchObject({
        toolName: 'applyOperation',
        isExecuted: true
      })
      expect(toolMessages[1]).toMatchObject({
        toolName: 'applyOperation',
        isExecuted: true
      })
      expect(toolMessages[2]).toMatchObject({
        toolName: 'applyOperation',
        isExecuted: false
      })
    })

    it('should reset tool deduplication after error for next conversation', async () => {
      const { result } = renderHook(() => useChat())

      await act(async () => {
        await result.current.submit('First message')
      })

      act(() => {
        capturedOptions.onToolCall('applyOperation')
      })

      act(() => {
        capturedOptions.onError(new Error('Something failed'))
      })

      await act(async () => {
        await result.current.submit('First message')
      })

      act(() => {
        capturedOptions.onToolCall('applyOperation')
      })

      const toolMessages = result.current.messages.filter((m) => m.role === 'tool-usage')
      expect(toolMessages).toHaveLength(2)
    })

    it('should reset tool deduplication after abort for next conversation', async () => {
      const { result } = renderHook(() => useChat())

      await act(async () => {
        await result.current.submit('First message')
      })

      act(() => {
        capturedOptions.onToolCall('applyOperation')
      })

      act(() => {
        capturedOptions.onAbort()
      })

      await act(async () => {
        await result.current.submit('Second message')
      })

      act(() => {
        capturedOptions.onToolCall('applyOperation')
      })

      const toolMessages = result.current.messages.filter((m) => m.role === 'tool-usage')
      expect(toolMessages).toHaveLength(2)
    })
  })
})
