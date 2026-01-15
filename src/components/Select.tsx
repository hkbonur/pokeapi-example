import { cn } from '@/utils/cn'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import * as React from 'react'

const SelectContext = React.createContext<{
  value: string
  onValueChange: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
} | null>(null)

export function Select({
  children,
  value,
  defaultValue,
  onValueChange,
  open: controlledOpen,
  onOpenChange,
  disabled,
  items: _items // Ignored but kept for interface compatibility
}: {
  children: React.ReactNode
  items?: any[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
}) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState(defaultValue || '')

  const isControlledOpen = controlledOpen !== undefined
  const isOpen = isControlledOpen ? controlledOpen : internalOpen

  const isControlledValue = value !== undefined
  const currentValue = isControlledValue ? value : internalValue

  const setOpen = (newOpen: boolean) => {
    if (!isControlledOpen) setInternalOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  const handleValueChange = (newValue: string) => {
    if (!isControlledValue) setInternalValue(newValue)
    onValueChange?.(newValue)
    setOpen(false)
  }

  return (
    <SelectContext.Provider
      value={{ value: currentValue || '', onValueChange: handleValueChange, open: !!isOpen, setOpen }}
    >
      <div className={cn('relative inline-block text-left', disabled && 'opacity-50 pointer-events-none')}>
        {children}
      </div>
    </SelectContext.Provider>
  )
}

export function SelectTrigger({
  children,
  className,
  size = 'default'
}: {
  children: React.ReactNode
  className?: string
  size?: 'default' | 'sm'
}) {
  const ctx = React.useContext(SelectContext)
  return (
    <button
      type="button"
      onClick={() => ctx?.setOpen(!ctx.open)}
      className={cn(
        'flex items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300',
        size === 'sm' && 'h-9 px-2',
        className
      )}
    >
      {children}
      <ChevronDownIcon className="h-4 w-4 opacity-50 ml-2" />
    </button>
  )
}

export function SelectValue({ children, className }: { children: React.ReactNode; className?: string }) {
  // In a real Select, this would render the label of the selected item if children is not provided.
  // The usage in ChatInputToolbar passes children explicitly to SelectValue, so we just render children.
  return <span className={className}>{children}</span>
}

export function SelectContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(SelectContext)
  if (!ctx || !ctx.open) return null

  return (
    <div
      className={cn(
        'absolute bottom-full left-0 mb-1 w-full min-w-32 overflow-hidden rounded-md border border-slate-200 bg-white text-slate-950 shadow-md dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50',
        className
      )}
    >
      <div className="p-1 h-full overflow-y-auto max-h-60">{children}</div>
    </div>
  )
}

export function SelectItem({
  value,
  children,
  className
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  const ctx = React.useContext(SelectContext)
  const isSelected = ctx?.value === value

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        ctx?.onValueChange(value)
      }}
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-slate-100 focus:text-slate-900 data-disabled:pointer-events-none data-disabled:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50 hover:bg-slate-100 dark:hover:bg-slate-800',
        isSelected && 'bg-slate-100 dark:bg-slate-800',
        className
      )}
    >
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && <CheckIcon className="h-4 w-4" />}
      </span>
      <span className="flex-1 truncate flex items-center">{children}</span>
    </div>
  )
}
