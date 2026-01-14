import type { MoveDetailEffectEntriesItem } from '../../../generated/schemas'

interface Props {
  effectEntries: readonly MoveDetailEffectEntriesItem[] | undefined
}

export function MoveEffect(props: Props) {
  if (!props.effectEntries || props.effectEntries.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg p-3">
      <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Effect</p>
      <p className="text-sm text-gray-700 leading-relaxed">
        {props.effectEntries[0].short_effect || props.effectEntries[0].effect}
      </p>
    </div>
  )
}
