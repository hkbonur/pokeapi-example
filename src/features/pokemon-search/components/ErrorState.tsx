interface Props {
  pokemonName: string | null
}

export function ErrorState(props: Props) {
  return (
    <div className="max-w-md mx-auto bg-red-600 text-white p-6 rounded-2xl shadow-2xl">
      <h3 className="text-2xl font-bold mb-2">Pokémon Not Found!</h3>
      <p className="text-lg">
        No Pokémon found with the name &quot;{props.pokemonName}&quot;. Please try another name.
      </p>
    </div>
  )
}
