import React from 'react'
import { type AIModel } from '../../config/aiProvider'
import { ChatInputToolbar } from './ChatInputToolbar'
import { useAutofocusAfterFinishLoading } from './hooks/useAutofocusAfterFinishLoading'
import { cn } from '@/utils/cn'
import { Textarea } from '@/components/Textarea'

interface Props {
  value: string
  onChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  isLoading: boolean
  placeholder?: string
  currentModel: AIModel
  setModel: (model: AIModel) => void
  onAbort: () => void
  className?: string
}

export function ChatInput(props: Props) {
  const { textareaRef } = useAutofocusAfterFinishLoading({
    value: props.value,
    isLoading: props.isLoading
  })

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter' || e.shiftKey) return
    e.preventDefault()
    props.onSubmit(e)
  }

  return (
    <form
      onSubmit={props.onSubmit}
      className={cn(
        'rounded-lg border border-input',
        'focus-within:ring ring-sky-600 focus-within:border-sky-600 dark:focus-within:ring-sky-900 dark:focus-within:border-sky-900',
        'h-auto min-h-14 flex flex-col justify-between',
        'pr-3 py-2 pl-2',
        props.className
      )}
    >
      <Textarea
        ref={textareaRef}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={props.placeholder || 'Ask Copilot...'}
        className="relative z-10 max-h-20 overflow-y-auto w-full resize-none border-none p-3 focus-visible:ring-0 bg-transparent dark:bg-transparent disabled:bg-transparent dark:disabled:bg-transparent placeholder:text-muted-foreground/50 text-sm leading-relaxed"
        rows={2}
        disabled={props.isLoading}
      />

      <div className="relative z-10">
        <ChatInputToolbar
          isLoading={props.isLoading}
          onAbort={props.onAbort}
          setModel={props.setModel}
          currentModel={props.currentModel}
        />
      </div>
    </form>
  )
}
