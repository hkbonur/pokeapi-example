import type { PokemonDetail } from '../../../generated/schemas'
import { usePokemonCard } from '../hooks/usePokemonCard'
import { TypeColorHeader } from './TypeColorHeader'
import { PokemonImage } from './PokemonImage'
import { PokemonHeader } from './PokemonHeader'
import { PokemonTypes } from './PokemonTypes'
import { PokemonStats } from './PokemonStats'
import { PokemonAbilities } from './PokemonAbilities'
import { PokemonMoves } from './PokemonMoves'
import { PokemonPhysicalAttributes } from './PokemonPhysicalAttributes'
import { MovesDrawer } from '@/components/MovesDrawer'

interface Props {
  pokemon: PokemonDetail
}

export function PokemonCard(props: Props) {
  const { isDrawerOpen, openDrawer, closeDrawer } = usePokemonCard()

  const totalMoves = props.pokemon.moves?.length || 0

  return (
    <>
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md mx-auto transform transition-all hover:scale-105">
        <TypeColorHeader types={props.pokemon.types} />

        <PokemonImage imageUrl={props.pokemon.sprites?.front_default} name={props.pokemon.name} />

        <div className="p-6 space-y-6">
          <PokemonHeader name={props.pokemon.name} id={props.pokemon.id} />

          <PokemonTypes types={props.pokemon.types} />

          <PokemonStats stats={props.pokemon.stats} />

          <PokemonAbilities abilities={props.pokemon.abilities} />

          <PokemonMoves moves={props.pokemon.moves || []} totalMoves={totalMoves} onViewAllClick={openDrawer} />

          <PokemonPhysicalAttributes height={props.pokemon.height} weight={props.pokemon.weight} />
        </div>
      </div>

      <MovesDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        moves={props.pokemon.moves || []}
        pokemonName={props.pokemon.name}
      />
    </>
  )
}
