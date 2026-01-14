import type { PokemonDetailStatsItem } from '../../../generated/schemas'

interface Props {
  stat: PokemonDetailStatsItem
}

export function StatBar(props: Props) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="font-semibold text-gray-600 capitalize">{props.stat.stat.name.replace('-', ' ')}</span>
        <span className="font-bold text-gray-800">{props.stat.base_stat}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-linear-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all"
          style={{
            width: `${Math.min((props.stat.base_stat / 255) * 100, 100)}%`
          }}
        />
      </div>
    </div>
  )
}
