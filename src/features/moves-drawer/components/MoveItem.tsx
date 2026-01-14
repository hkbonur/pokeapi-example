import type { PokemonDetailMovesItem } from '../../../generated/schemas'
import { useApiV2MoveRetrieve } from '../../../generated/pokeapi'
import { useMoveItem } from '../hooks/useMoveItem'
import { MoveItemHeader } from './MoveItemHeader'
import { MoveDetailsLoading } from './MoveDetailsLoading'
import { MoveDetails } from './MoveDetails'

interface Props {
  move: PokemonDetailMovesItem
}

export function MoveItem(props: Props) {
  const { isExpanded, toggleExpanded } = useMoveItem()
  const moveName = props.move.move.name

  const { data, isLoading } = useApiV2MoveRetrieve(moveName, {
    query: {
      enabled: isExpanded
    }
  })

  const moveData = data?.data

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <MoveItemHeader moveName={moveName} isExpanded={isExpanded} isLoading={isLoading} onToggle={toggleExpanded} />

      {isExpanded && (
        <div className="px-4 pb-4 space-y-3 bg-gray-50">
          {isLoading && <MoveDetailsLoading />}

          {moveData && <MoveDetails moveData={moveData} />}
        </div>
      )}
    </div>
  )
}
