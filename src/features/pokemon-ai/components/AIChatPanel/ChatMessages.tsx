import React from 'react'
import { ChatMessage, type UiMessage } from '../ChatMessage'
import { AILoadingIndicator } from './AILoadingIndicator'
import { ScrollArea } from '@/components/ScrollArea'

interface Props {
  messages: UiMessage[]
  scrollRef: React.RefObject<HTMLDivElement | null>
  isLoading: boolean
}

export function ChatMessages(props: Props) {
  return (
    <ScrollArea className="flex-1 px-4 h-[69%]">
      <div className="flex flex-col gap-4">
        {props.messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <AILoadingIndicator isLoading={props.isLoading} />
        <div ref={props.scrollRef} />
      </div>
    </ScrollArea>
  )
}
