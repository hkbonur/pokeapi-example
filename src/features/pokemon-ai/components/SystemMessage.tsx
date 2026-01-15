import { Reasoning, ReasoningTrigger, ReasoningContent } from '@/components/Reasoning'
import { cn } from '@/utils/cn'
import { Streamdown } from 'streamdown'

interface Props {
  content: string
  reasoning?: string
  isStreamingReasoning?: boolean
  isStreamingContent?: boolean
  isAborted?: boolean
}

export function SystemMessage(props: Props) {
  const hasReasoning = Boolean(props.reasoning)

  return (
    <div
      className={cn('flex flex-col', {
        'opacity-15 hover:opacity-100 transition-opacity': props.isAborted
      })}
    >
      {hasReasoning ? (
        <Reasoning isStreaming={props.isStreamingReasoning} defaultOpen={false}>
          <ReasoningTrigger />
          <ReasoningContent>
            <Streamdown isAnimating={props.isStreamingReasoning}>{props.reasoning || ''}</Streamdown>
          </ReasoningContent>
        </Reasoning>
      ) : null}

      <div
        className={cn('max-w-[85%] scale-95 text-sm', {
          'opacity-0': props.content.length < 5,
          'scale-100 transition-transform': !props.isStreamingContent
        })}
      >
        <Streamdown isAnimating={props.isStreamingContent}>{props.content}</Streamdown>
      </div>
    </div>
  )
}
