import { ChevronDown, ChevronRight, Loader2 } from 'lucide-react'

interface Props {
  moveName: string
  isExpanded: boolean
  isLoading: boolean
  onToggle: () => void
}

export function MoveItemHeader(props: Props) {
  return (
    <button
      onClick={props.onToggle}
      className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
    >
      <span className="font-medium text-gray-800 capitalize text-left">{props.moveName.replace(/-/g, ' ')}</span>
      <div className="flex items-center gap-2">
        {props.isExpanded && props.isLoading && <Loader2 size={16} className="animate-spin text-gray-400" />}
        {props.isExpanded ? (
          <ChevronDown size={20} className="text-gray-500" />
        ) : (
          <ChevronRight size={20} className="text-gray-500" />
        )}
      </div>
    </button>
  )
}
