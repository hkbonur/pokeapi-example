import { Spinner } from '@/components/Spinner'
import { CheckIcon } from 'lucide-react'
import React from 'react'
import { getToolDisplayName } from '../utils/toolDisplayNames'

interface Props {
  toolName: string
  /** Whether the tool has finished executing */
  isExecuted?: boolean
}

export function ToolUsageMessage(props: Props) {
  const displayName = getToolDisplayName(props.toolName, props.isExecuted === true)
  const hasInitiatedExecutedTimerRef = React.useRef<boolean>(false)
  const [hasExecuted, setHasExecuted] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (hasInitiatedExecutedTimerRef.current || !props.isExecuted) return
    hasInitiatedExecutedTimerRef.current = true
    setTimeout(() => {
      setHasExecuted(true)
    }, 1000)
  }, [props.isExecuted])

  return (
    <div className="flex flex-col items-start -mt-2">
      <div className="max-w-[85%] text-xs text-muted-foreground flex items-center gap-1 flex-row bg-accent px-2 py-1 rounded-md">
        {hasExecuted ? (
          <>
            {<CheckIcon className="size-3 dark:text-green-700 text-green-400" />} {displayName}
          </>
        ) : (
          <div className="text-xs flex flex-row gap-1 items-center font-medium">
            <Spinner className="size-3" /> {displayName}
          </div>
        )}
      </div>
    </div>
  )
}
