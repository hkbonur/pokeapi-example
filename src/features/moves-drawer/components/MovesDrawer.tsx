import type { PokemonDetailMovesItem } from '../../../generated/schemas'
import { useMovesDrawer } from '../hooks/useMovesDrawer'
import { DrawerOverlay } from './DrawerOverlay'
import { DrawerHeader } from './DrawerHeader'
import { MoveItem } from './MoveItem'

interface Props {
  isOpen: boolean
  onClose: () => void
  moves: readonly PokemonDetailMovesItem[]
  pokemonName: string
}

export function MovesDrawer(props: Props) {
  useMovesDrawer({ isOpen: props.isOpen, onClose: props.onClose })

  if (!props.isOpen) return null

  return (
    <>
      <DrawerOverlay onClose={props.onClose} />

      <div
        className="fixed right-0 top-0 h-full w-full sm:w-125 bg-white shadow-2xl z-50 transform transition-transform overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <DrawerHeader pokemonName={props.pokemonName} totalMoves={props.moves.length} onClose={props.onClose} />

        <div className="flex-1 overflow-y-auto">
          {props.moves.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No moves available for this Pokémon.</div>
          ) : (
            <div className="divide-y divide-gray-200">
              {props.moves.map((move, index) => (
                <MoveItem key={`${move.move.name}-${index}`} move={move} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
