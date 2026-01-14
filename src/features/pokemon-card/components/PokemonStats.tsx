import { StatBar } from './StatBar'
import type { PokemonDetailStatsItem } from '../../../generated/schemas'

interface Props {
  stats: readonly PokemonDetailStatsItem[] | undefined
}

export function PokemonStats(props: Props) {
  return (
    <div className="space-y-2">
      <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wide mb-3">Base Stats</h3>
      {props.stats?.slice(0, 6).map((stat) => (
        <StatBar key={stat.stat.name} stat={stat} />
      ))}
    </div>
  )
}
