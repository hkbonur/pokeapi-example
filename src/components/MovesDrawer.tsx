import { useState, useEffect } from "react";
import { X, ChevronDown, ChevronRight, Loader2 } from "lucide-react";
import type { PokemonDetailMovesItem } from "../generated/schemas";
import { useApiV2MoveRetrieve } from "../generated/pokeapi";
import { getPokemonTypeColor } from "../utils/pokemonTypes";

interface MovesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  moves: readonly PokemonDetailMovesItem[];
  pokemonName: string;
}

interface MoveItemProps {
  move: PokemonDetailMovesItem;
}

function MoveItem({ move }: MoveItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const moveName = move.move.name;

  const { data, isLoading } = useApiV2MoveRetrieve(moveName, {
    query: {
      enabled: isExpanded,
    },
  });

  const moveData = data?.data;

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-800 capitalize text-left">
          {moveName.replace(/-/g, " ")}
        </span>
        <div className="flex items-center gap-2">
          {isExpanded && isLoading && (
            <Loader2 size={16} className="animate-spin text-gray-400" />
          )}
          {isExpanded ? (
            <ChevronDown size={20} className="text-gray-500" />
          ) : (
            <ChevronRight size={20} className="text-gray-500" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-3 bg-gray-50">
          {isLoading && (
            <div className="text-center py-4">
              <Loader2
                size={24}
                className="animate-spin text-gray-400 mx-auto"
              />
              <p className="text-sm text-gray-500 mt-2">
                Loading move details...
              </p>
            </div>
          )}

          {moveData && (
            <>
              {/* Type and Damage Class */}
              <div className="flex gap-2 flex-wrap">
                {moveData.type && (
                  <span
                    className="px-3 py-1 rounded-full text-white font-semibold text-xs uppercase"
                    style={{
                      backgroundColor: getPokemonTypeColor(moveData.type.name),
                    }}
                  >
                    {moveData.type.name}
                  </span>
                )}
                {moveData.damage_class && (
                  <span className="px-3 py-1 rounded-full bg-gray-600 text-white font-semibold text-xs uppercase">
                    {moveData.damage_class.name}
                  </span>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-500 font-semibold uppercase">
                    Power
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    {moveData.power ?? "—"}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-500 font-semibold uppercase">
                    Accuracy
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    {moveData.accuracy ? `${moveData.accuracy}%` : "—"}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-500 font-semibold uppercase">
                    PP
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    {moveData.pp ?? "—"}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-500 font-semibold uppercase">
                    Priority
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    {moveData.priority ?? 0}
                  </p>
                </div>
              </div>

              {/* Effect */}
              {moveData.effect_entries &&
                moveData.effect_entries.length > 0 && (
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-xs text-gray-500 font-semibold uppercase mb-1">
                      Effect
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {moveData.effect_entries[0].short_effect ||
                        moveData.effect_entries[0].effect}
                    </p>
                  </div>
                )}

              {/* Flavor Text */}
              {moveData.flavor_text_entries &&
                moveData.flavor_text_entries.length > 0 && (
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-xs text-gray-500 font-semibold uppercase mb-1">
                      Description
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {moveData.flavor_text_entries
                        .find((entry) => entry.language.name === "en")
                        ?.flavor_text.replace(/\n/g, " ")}
                    </p>
                  </div>
                )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function MovesDrawer({
  isOpen,
  onClose,
  moves,
  pokemonName,
}: MovesDrawerProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 h-full w-full sm:w-125 bg-white shadow-2xl z-50 transform transition-transform overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        {/* Header */}
        <div className="bg-linear-to-r from-red-500 to-red-600 p-6 flex items-center justify-between shrink-0">
          <div>
            <h2
              id="drawer-title"
              className="text-2xl font-bold text-white capitalize"
            >
              {pokemonName}&apos;s Moves
            </h2>
            <p className="text-white/90 text-sm mt-1">
              {moves.length} moves available
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close drawer"
          >
            <X size={28} className="text-white" />
          </button>
        </div>

        {/* Moves List */}
        <div className="flex-1 overflow-y-auto">
          {moves.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No moves available for this Pokémon.
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {moves.map((move, index) => (
                <MoveItem key={`${move.move.name}-${index}`} move={move} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
