interface Props {
  height: number | null | undefined
  weight: number | null | undefined
}

export function PokemonPhysicalAttributes(props: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
      <div className="text-center">
        <p className="text-sm text-gray-500 font-semibold">Height</p>
        <p className="text-2xl font-bold text-gray-800">{props.height ? (props.height / 10).toFixed(1) : '—'} m</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-500 font-semibold">Weight</p>
        <p className="text-2xl font-bold text-gray-800">{props.weight ? (props.weight / 10).toFixed(1) : '—'} kg</p>
      </div>
    </div>
  )
}
