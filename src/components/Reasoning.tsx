import * as React from 'react'
import { cn } from '@/utils/cn'
import { ArrowDownIcon, BrainIcon } from 'lucide-react'

const ReasoningContext = React.createContext<{
  open: boolean
  toggle: () => void
  isStreaming?: boolean
} | null>(null)

export function Reasoning({
  children,
  defaultOpen = false,
  isStreaming
}: {
  children: React.ReactNode
  defaultOpen?: boolean
  isStreaming?: boolean
}) {
  const [open, setOpen] = React.useState(defaultOpen)

  // If streaming, maybe we want to auto-open? Or just show indicator.
  // We'll stick to simple toggle unless asked otherwise.

  return (
    <ReasoningContext.Provider value={{ open, toggle: () => setOpen(!open), isStreaming }}>
      <div className="border border-slate-200 dark:border-slate-800 rounded-md my-2 overflow-hidden">{children}</div>
    </ReasoningContext.Provider>
  )
}

export function ReasoningTrigger() {
  const ctx = React.useContext(ReasoningContext)
  if (!ctx) return null

  return (
    <button
      onClick={ctx.toggle}
      className="flex items-center w-full px-3 py-2 text-xs font-medium text-slate-500 bg-slate-50 dark:bg-slate-900 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
    >
      {ctx.isStreaming && <BrainIcon className="w-3 h-3 mr-2 animate-pulse" />}
      {!ctx.isStreaming && <BrainIcon className="w-3 h-3 mr-2" />}
      Thought Process
      <ArrowDownIcon className={cn('ml-auto w-3 h-3 transition-transform duration-200', ctx.open && 'rotate-180')} />
    </button>
  )
}

export function ReasoningContent({ children }: { children: React.ReactNode }) {
  const ctx = React.useContext(ReasoningContext)
  if (!ctx) return null

  if (!ctx.open) return null

  return (
    <div className="px-3 py-2 text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      {children}
    </div>
  )
}
