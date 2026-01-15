import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/Tooltip'
import { MinusIcon, PlusIcon } from 'lucide-react'

interface Props {
  onNewChat: () => void
  onMinimize: () => void
}

export function ChatHeader(props: Props) {
  return (
    <div className="flex items-center justify-end gap-1 px-4 py-2">
      <Tooltip>
        <TooltipTrigger
          render={(triggerProps) => (
            <button
              {...triggerProps}
              type="button"
              onClick={props.onNewChat}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
              aria-label="New chat"
            >
              <PlusIcon size={16} className="text-muted-foreground" />
            </button>
          )}
        />
        <TooltipContent>New chat</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger
          render={(triggerProps) => (
            <button
              {...triggerProps}
              type="button"
              onClick={props.onMinimize}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
              aria-label="Minimize chat"
            >
              <MinusIcon size={16} className="text-muted-foreground" />
            </button>
          )}
        />
        <TooltipContent>Minimize</TooltipContent>
      </Tooltip>
    </div>
  )
}
