interface Props {
  name: string
  id: number | undefined
}

export function PokemonHeader(props: Props) {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-black text-gray-800 capitalize">{props.name}</h2>
      <p className="text-gray-500 font-bold">#{String(props.id).padStart(3, '0')}</p>
    </div>
  )
}
