import { getPokemonTypeColor } from '../../../utils/pokemonTypes'
import type { PokemonDetailTypesItem } from '../../../generated/schemas'

interface Props {
  types: readonly PokemonDetailTypesItem[] | undefined
}

export function PokemonTypes(props: Props) {
  return (
    <div className="flex justify-center gap-3 flex-wrap">
      {props.types?.map((typeInfo) => (
        <span
          key={typeInfo.type.name}
          className="px-6 py-2 rounded-full text-white font-bold text-sm uppercase tracking-wide shadow-md"
          style={{
            backgroundColor: getPokemonTypeColor(typeInfo.type.name)
          }}
        >
          {typeInfo.type.name}
        </span>
      ))}
    </div>
  )
}
