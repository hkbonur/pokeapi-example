import type { MoveFlavorText } from '../../../generated/schemas'

interface Props {
  flavorTextEntries: readonly MoveFlavorText[] | undefined
}

export function MoveDescription(props: Props) {
  if (!props.flavorTextEntries || props.flavorTextEntries.length === 0) {
    return null
  }

  const englishEntry = props.flavorTextEntries.find((entry) => entry.language.name === 'en')

  if (!englishEntry) {
    return null
  }

  return (
    <div className="bg-white rounded-lg p-3">
      <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Description</p>
      <p className="text-sm text-gray-600 leading-relaxed">{englishEntry.flavor_text.replace(/\n/g, ' ')}</p>
    </div>
  )
}
