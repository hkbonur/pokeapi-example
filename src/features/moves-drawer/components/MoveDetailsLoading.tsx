import { Loader2 } from 'lucide-react'

export function MoveDetailsLoading() {
  return (
    <div className="text-center py-4">
      <Loader2 size={24} className="animate-spin text-gray-400 mx-auto" />
      <p className="text-sm text-gray-500 mt-2">Loading move details...</p>
    </div>
  )
}
