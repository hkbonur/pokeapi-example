import type { PokemonDetailMovesItem } from '../../../generated/schemas'

interface Props {
  moves: readonly PokemonDetailMovesItem[]
  totalMoves: number
  onViewAllClick: () => void
}

export function PokemonMoves(props: Props) {
  const displayedMoves = props.moves.slice(0, 3)

  return (
    <div>
      <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wide mb-3">Moves</h3>
      <div className="space-y-2 mb-3">
        {displayedMoves.map((moveInfo) => (
          <div
            key={moveInfo.move.name}
            className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 capitalize"
          >
            {moveInfo.move.name.replace('-', ' ')}
          </div>
        ))}
      </div>
      {props.totalMoves > 3 && (
        <button
          onClick={props.onViewAllClick}
          className="w-full bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105"
        >
          View All {props.totalMoves} Moves
        </button>
      )}
    </div>
  )
}
