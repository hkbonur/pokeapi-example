import React from 'react'
import { type ToolUsageUiMessage, type UiMessage } from '../../components/ChatMessage'

interface ToolTrackingCallbacks {
  addToolMessage: (toolName: string) => string
  updateMessage: <T extends UiMessage>(id: string, updater: (msg: T) => Partial<T>) => void
}

/**
 * Tracks tool usage state to:
 * - Deduplicate consecutive calls to the same tool
 * - Mark tool messages as executed when complete
 */
export function useToolTracking(callbacks: ToolTrackingCallbacks) {
  const lastToolIdRef = React.useRef<string | null>(null)

  const markToolExecuted = React.useCallback(() => {
    if (lastToolIdRef.current) {
      callbacks.updateMessage<ToolUsageUiMessage>(lastToolIdRef.current, () => ({
        isExecuted: true
      }))
      lastToolIdRef.current = null
      // Note: we intentionally keep lastToolNameRef to dedupe consecutive calls of the same tool
    }
  }, [callbacks])

  const handleToolCall = React.useCallback(
    (toolName: string) => {
      // Mark previous tool as executed before creating a new one
      markToolExecuted()

      const id = callbacks.addToolMessage(toolName)
      lastToolIdRef.current = id
    },
    [callbacks, markToolExecuted]
  )

  return {
    handleToolCall,
    handleToolResult: markToolExecuted,
    reset: markToolExecuted
  }
}
