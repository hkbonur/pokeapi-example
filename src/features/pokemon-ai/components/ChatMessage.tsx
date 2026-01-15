import { ErrorMessage } from './ErrorMessage'
import { SystemMessage } from './SystemMessage'
import { ToolUsageMessage } from './ToolUsageMessage'
import { UserMessage } from './UserMessage'

/** Base properties shared by all UI messages */
interface BaseUiMessage {
  id: string
}

/** User message - simple text input */
export interface UserUiMessage extends BaseUiMessage {
  role: 'user'
  content: string
  isAborted?: boolean
}

/** Assistant message - AI response with optional reasoning */
export interface AssistantUiMessage extends BaseUiMessage {
  role: 'assistant'
  content: string
  reasoning?: string
  isStreamingReasoning?: boolean
  isStreamingContent?: boolean
  isAborted?: boolean
}

/** System message - hidden context message */
export interface SystemUiMessage extends BaseUiMessage {
  role: 'system'
  content: string
}

/** Error message - displayed as error bubble */
export interface ErrorUiMessage extends BaseUiMessage {
  role: 'error'
  content: string
}

/** Tool usage message - shows tool activity with shimmer */
export interface ToolUsageUiMessage extends BaseUiMessage {
  role: 'tool-usage'
  toolName: string
  isExecuted?: boolean
}

/** Discriminated union of all UI message types */
export type UiMessage = UserUiMessage | AssistantUiMessage | SystemUiMessage | ErrorUiMessage | ToolUsageUiMessage

interface Props {
  message: UiMessage
  index?: number
}

export function ChatMessage(props: Props) {
  // Stagger animation delay based on index
  const animationDelay = props.index !== undefined ? props.index * 50 : 0

  if (props.message.role === 'user') {
    return (
      <div style={{ animationDelay: `${animationDelay}ms` }}>
        <UserMessage content={props.message.content} isAborted={props.message.isAborted} />
      </div>
    )
  }

  if (props.message.role === 'error') {
    return (
      <div style={{ animationDelay: `${animationDelay}ms` }}>
        <ErrorMessage content={props.message.content} />
      </div>
    )
  }

  if (props.message.role === 'tool-usage') {
    return (
      <div style={{ animationDelay: `${animationDelay}ms` }}>
        <ToolUsageMessage toolName={props.message.toolName} isExecuted={props.message.isExecuted} />
      </div>
    )
  }

  if (props.message.role === 'assistant') {
    return (
      <div style={{ animationDelay: `${animationDelay}ms` }}>
        <SystemMessage
          content={props.message.content}
          reasoning={props.message.reasoning}
          isStreamingReasoning={props.message.isStreamingReasoning}
          isStreamingContent={props.message.isStreamingContent}
          isAborted={props.message.isAborted}
        />
      </div>
    )
  }

  // System messages are not rendered in UI
  return null
}
