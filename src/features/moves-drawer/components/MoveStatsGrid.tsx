interface StatItemProps {
  label: string
  value: string | number
}

function StatItem(props: StatItemProps) {
  return (
    <div className="bg-white rounded-lg p-3">
      <p className="text-xs text-gray-500 font-semibold uppercase">{props.label}</p>
      <p className="text-lg font-bold text-gray-800">{props.value}</p>
    </div>
  )
}

interface Props {
  power: number | null | undefined
  accuracy: number | null | undefined
  pp: number | null | undefined
  priority: number | null | undefined
}

export function MoveStatsGrid(props: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <StatItem label="Power" value={props.power ?? '—'} />
      <StatItem label="Accuracy" value={props.accuracy ? `${props.accuracy}%` : '—'} />
      <StatItem label="PP" value={props.pp ?? '—'} />
      <StatItem label="Priority" value={props.priority ?? 0} />
    </div>
  )
}
