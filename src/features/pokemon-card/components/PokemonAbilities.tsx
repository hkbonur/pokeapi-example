import type { PokemonDetailAbilitiesItem } from '../../../generated/schemas'

interface Props {
  abilities: readonly PokemonDetailAbilitiesItem[] | undefined
}

export function PokemonAbilities(props: Props) {
  return (
    <div>
      <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wide mb-3">Abilities</h3>
      <div className="flex flex-wrap gap-2">
        {props.abilities?.slice(0, 3).map((abilityInfo) => (
          <span
            key={abilityInfo.ability.name}
            className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg font-semibold text-sm capitalize"
          >
            {abilityInfo.ability.name.replace('-', ' ')}
            {abilityInfo.is_hidden && <span className="ml-1 text-xs">(Hidden)</span>}
          </span>
        ))}
      </div>
    </div>
  )
}
