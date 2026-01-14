interface Props {
  imageUrl: string | undefined
  name: string
}

export function PokemonImage(props: Props) {
  return (
    <div className="bg-linear-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
      {props.imageUrl ? (
        <img src={props.imageUrl} alt={props.name} className="w-48 h-48 object-contain drop-shadow-2xl" />
      ) : (
        <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-400 text-lg">No Image</span>
        </div>
      )}
    </div>
  )
}
