import { cn } from '@/utils/cn'
import { MessageCircleWarningIcon } from 'lucide-react'

interface Props {
  content: string
}

export function ErrorMessage(props: Props) {
  return (
    <div className="flex flex-col items-start animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-3',
          'bg-destructive/10',
          'text-destructive',
          'flex items-start gap-2'
        )}
      >
        <MessageCircleWarningIcon className="size-5 mt-0.5 shrink-0 text-destructive" />
        <p className="text-sm leading-relaxed flex-1 font-medium">{props.content}</p>
      </div>
    </div>
  )
}
