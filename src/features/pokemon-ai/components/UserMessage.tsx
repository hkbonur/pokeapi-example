import { cn } from '@/utils/cn'

interface Props {
  content: string
  isAborted?: boolean
}

export function UserMessage(props: Props) {
  return (
    <div
      className={cn('flex flex-col items-end animate-in fade-in slide-in-from-bottom-2 duration-300', {
        'opacity-15 hover:opacity-100 transition-opacity duration-200': props.isAborted
      })}
    >
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-2.5',
          'bg-primary text-primary-foreground',
          'shadow-md shadow-primary/20',
          'transition-all duration-200',
          'hover:shadow-lg hover:shadow-primary/30',
          {
            hidden: !props.content.trim().length
          }
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap wrap-break-word">{props.content}</p>
      </div>
    </div>
  )
}
