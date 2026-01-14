import { getPokemonTypeColor } from '../../../utils/pokemonTypes'
import type { PokemonDetailTypesItem } from '../../../generated/schemas'

interface Props {
  types: readonly PokemonDetailTypesItem[] | undefined
}

export function TypeColorHeader(props: Props) {
  return (
    <div
      className="h-3"
      style={{
        background: `linear-gradient(to right, ${props.types?.map((t) => getPokemonTypeColor(t.type.name)).join(', ')})`
      }}
    />
  )
}
