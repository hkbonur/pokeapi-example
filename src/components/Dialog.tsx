import { cn } from '@/utils/cn'
import { PlusIcon } from 'lucide-react'
import * as React from 'react'

const DialogContext = React.createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
} | null>(null)

export function Dialog({
  children,
  open,
  onOpenChange
}: {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  // If controlled, use props. If uncontrolled, use state (not implemented for brevity as usage is controlled)
  return (
    <DialogContext.Provider value={{ open: !!open, onOpenChange: onOpenChange || (() => {}) }}>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 md:bg-black/50" onClick={() => onOpenChange?.(false)} />
          {children}
        </div>
      )}
    </DialogContext.Provider>
  )
}

export function DialogContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(DialogContext)
  return (
    <div
      className={cn(
        'relative w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-lg duration-200 sm:rounded-lg dark:bg-slate-950 border border-slate-200 dark:border-slate-800 z-50',
        className
      )}
    >
      {children}
      <button
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 dark:ring-offset-slate-950 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800"
        onClick={() => ctx?.onOpenChange(false)}
      >
        <PlusIcon className="h-4 w-4 rotate-45" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  )
}

export function DialogTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cn('text-lg font-semibold leading-none tracking-tight', className)}>{children}</h2>
}

export function DialogDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('text-sm text-slate-500 dark:text-slate-400 mt-2', className)}>{children}</p>
}

export function DialogFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4', className)}>
      {children}
    </div>
  )
}
