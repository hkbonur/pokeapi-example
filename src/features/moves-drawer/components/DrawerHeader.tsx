import { X } from 'lucide-react'

interface Props {
  pokemonName: string
  totalMoves: number
  onClose: () => void
}

export function DrawerHeader(props: Props) {
  return (
    <div className="bg-linear-to-r from-red-500 to-red-600 p-6 flex items-center justify-between shrink-0">
      <div>
        <h2 id="drawer-title" className="text-2xl font-bold text-white capitalize">
          {props.pokemonName}&apos;s Moves
        </h2>
        <p className="text-white/90 text-sm mt-1">{props.totalMoves} moves available</p>
      </div>
      <button
        onClick={props.onClose}
        className="p-2 hover:bg-white/20 rounded-full transition-colors"
        aria-label="Close drawer"
      >
        <X size={28} className="text-white" />
      </button>
    </div>
  )
}
