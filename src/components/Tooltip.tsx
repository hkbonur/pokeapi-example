import * as React from 'react'

const TooltipContext = React.createContext<{
  isVisible: boolean
  show: () => void
  hide: () => void
} | null>(null)

export function Tooltip({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = React.useState(false)
  const show = () => setIsVisible(true)
  const hide = () => setIsVisible(false)

  return (
    <TooltipContext.Provider value={{ isVisible, show, hide }}>
      <div
        className="relative inline-flex flex-col items-center"
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocusCapture={show}
        onBlurCapture={hide}
      >
        {children}
      </div>
    </TooltipContext.Provider>
  )
}

interface TooltipTriggerProps {
  children?: React.ReactNode
  render?: (props: any) => React.ReactNode
}

export function TooltipTrigger({ children, render }: TooltipTriggerProps) {
  // In this simple implementation, the parent handles events.
  // We pass empty props or simple accessible props if needed.
  const props = {}

  if (render) {
    return <>{render(props)}</>
  }

  return <>{children}</>
}

export function TooltipContent({ children }: { children: React.ReactNode }) {
  const ctx = React.useContext(TooltipContext)
  if (!ctx || !ctx.isVisible) return null

  return (
    <div className="absolute top-full mt-2 z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-900">
      {children}
    </div>
  )
}
