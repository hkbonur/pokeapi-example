import { useState } from "react";
import type { PokemonDetail } from "../generated/schemas";
import { getPokemonTypeColor } from "../utils/pokemonTypes";
import { MovesDrawer } from "./MovesDrawer";

interface PokemonCardProps {
  pokemon: PokemonDetail;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const displayedMoves = pokemon.moves?.slice(0, 3) || [];
  const totalMoves = pokemon.moves?.length || 0;

  return (
    <>
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md mx-auto transform transition-all hover:scale-105">
        {/* Card Header with Type Colors */}
        <div
          className="h-3"
          style={{
            background: `linear-gradient(to right, ${pokemon.types?.map((t) => getPokemonTypeColor(t.type.name)).join(", ")})`,
          }}
        />

        {/* Pokemon Image */}
        <div className="bg-linear-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
          {pokemon.sprites?.front_default ? (
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-48 h-48 object-contain drop-shadow-2xl"
            />
          ) : (
            <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-400 text-lg">No Image</span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-6">
          {/* Pokemon Name and ID */}
          <div className="text-center">
            <h2 className="text-4xl font-black text-gray-800 capitalize">
              {pokemon.name}
            </h2>
            <p className="text-gray-500 font-bold">
              #{String(pokemon.id).padStart(3, "0")}
            </p>
          </div>

          {/* Types */}
          <div className="flex justify-center gap-3 flex-wrap">
            {pokemon.types?.map((typeInfo) => (
              <span
                key={typeInfo.type.name}
                className="px-6 py-2 rounded-full text-white font-bold text-sm uppercase tracking-wide shadow-md"
                style={{
                  backgroundColor: getPokemonTypeColor(typeInfo.type.name),
                }}
              >
                {typeInfo.type.name}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="space-y-2">
            <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wide mb-3">
              Base Stats
            </h3>
            {pokemon.stats?.slice(0, 6).map((stat) => (
              <div key={stat.stat.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-gray-600 capitalize">
                    {stat.stat.name.replace("-", " ")}
                  </span>
                  <span className="font-bold text-gray-800">
                    {stat.base_stat}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-linear-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min((stat.base_stat / 255) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Abilities */}
          <div>
            <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wide mb-3">
              Abilities
            </h3>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities?.slice(0, 3).map((abilityInfo) => (
                <span
                  key={abilityInfo.ability.name}
                  className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg font-semibold text-sm capitalize"
                >
                  {abilityInfo.ability.name.replace("-", " ")}
                  {abilityInfo.is_hidden && (
                    <span className="ml-1 text-xs">(Hidden)</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Moves Preview */}
          <div>
            <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wide mb-3">
              Moves
            </h3>
            <div className="space-y-2 mb-3">
              {displayedMoves.map((moveInfo) => (
                <div
                  key={moveInfo.move.name}
                  className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 capitalize"
                >
                  {moveInfo.move.name.replace("-", " ")}
                </div>
              ))}
            </div>
            {totalMoves > 3 && (
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="w-full bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105"
              >
                View All {totalMoves} Moves
              </button>
            )}
          </div>

          {/* Physical Attributes */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-500 font-semibold">Height</p>
              <p className="text-2xl font-bold text-gray-800">
                {pokemon.height ? (pokemon.height / 10).toFixed(1) : "—"} m
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 font-semibold">Weight</p>
              <p className="text-2xl font-bold text-gray-800">
                {pokemon.weight ? (pokemon.weight / 10).toFixed(1) : "—"} kg
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Moves Drawer */}
      <MovesDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        moves={pokemon.moves || []}
        pokemonName={pokemon.name}
      />
    </>
  );
}
