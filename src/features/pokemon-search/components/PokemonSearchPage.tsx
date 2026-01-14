import { usePokemonSearch } from "../hooks/usePokemonSearch";
import { PageHeader } from "./PageHeader";
import { SearchForm } from "./SearchForm";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { PokemonCard } from "@/components/PokemonCard";

export function PokemonSearchPage() {
  const {
    searchTerm,
    pokemonName,
    pokemon,
    isLoading,
    error,
    handleSearch,
    handleSearchTermChange,
  } = usePokemonSearch();

  return (
    <div className="min-h-screen bg-linear-to-br from-red-500 via-yellow-400 to-blue-500">
      <div className="container mx-auto px-4 py-16">
        <PageHeader />

        <SearchForm
          searchTerm={searchTerm}
          onSearchTermChange={handleSearchTermChange}
          onSubmit={handleSearch}
        />

        {isLoading && <LoadingState />}

        {!!error && <ErrorState pokemonName={pokemonName} />}

        {pokemon && <PokemonCard pokemon={pokemon} />}
      </div>
    </div>
  );
}
