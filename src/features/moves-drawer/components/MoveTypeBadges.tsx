import { getPokemonTypeColor } from '../../../utils/pokemonTypes'

interface Props {
  typeName: string | undefined
  damageClassName: string | undefined
}

export function MoveTypeBadges(props: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      {props.typeName && (
        <span
          className="px-3 py-1 rounded-full text-white font-semibold text-xs uppercase"
          style={{
            backgroundColor: getPokemonTypeColor(props.typeName)
          }}
        >
          {props.typeName}
        </span>
      )}
      {props.damageClassName && (
        <span className="px-3 py-1 rounded-full bg-gray-600 text-white font-semibold text-xs uppercase">
          {props.damageClassName}
        </span>
      )}
    </div>
  )
}
