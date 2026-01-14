import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { useApiV2PokemonRetrieve } from "../generated/pokeapi";
import { PokemonCard } from "../components/PokemonCard";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonName, setPokemonName] = useState<string | null>(null);

  const { data, isLoading, error } = useApiV2PokemonRetrieve(
    pokemonName || "",
    {
      query: {
        enabled: !!pokemonName,
      },
    },
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setPokemonName(searchTerm.trim().toLowerCase());
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-red-500 via-yellow-400 to-blue-500">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-7xl font-black text-white mb-4 drop-shadow-lg tracking-tight">
            POKÉDEX
          </h1>
          <p className="text-2xl text-white/90 font-semibold drop-shadow">
            Search and discover your favorite Pokémon
          </p>
        </div>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter Pokémon name (e.g., pikachu, charizard)..."
              className="w-full px-6 py-5 text-xl rounded-full border-4 border-white shadow-2xl focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all"
              aria-label="Search for a Pokémon"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-colors shadow-lg"
              aria-label="Search"
            >
              <Search size={28} />
            </button>
          </div>
        </form>

        {isLoading && (
          <div className="text-center">
            <div className="inline-block h-16 w-16 animate-spin rounded-full border-8 border-white border-t-transparent"></div>
            <p className="mt-4 text-2xl text-white font-bold">Searching...</p>
          </div>
        )}

        {!!error && (
          <div className="max-w-md mx-auto bg-red-600 text-white p-6 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-2">Pokémon Not Found!</h3>
            <p className="text-lg">
              No Pokémon found with the name &quot;{pokemonName}&quot;. Please
              try another name.
            </p>
          </div>
        )}

        {data?.data && <PokemonCard pokemon={data.data} />}
      </div>
    </div>
  );
}
