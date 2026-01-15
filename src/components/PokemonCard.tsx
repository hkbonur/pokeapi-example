import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Ruler, Weight, Sparkles, Dumbbell } from 'lucide-react'
import type { PokemonDetail } from '../generated/schemas'
import { getPokemonTypeColor } from '../utils/pokemonTypes'
import { MovesDrawer } from './MovesDrawer'

interface PokemonCardProps {
  pokemon: PokemonDetail
}

type Tab = 'about' | 'stats' | 'moves'

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('about')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const mainType = pokemon.types?.[0]?.type.name || 'normal'
  const typeColor = getPokemonTypeColor(mainType)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        whileHover={{ y: -5 }}
        className="relative bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl max-w-sm mx-auto border border-white/50"
      >
        {/* Dynamic Background Header */}
        <div
          className="h-28 relative"
          style={{
            background: `linear-gradient(to bottom right, ${typeColor}, ${typeColor}88)`
          }}
        >
          <div className="absolute top-4 right-4 text-white/50 font-black text-4xl opacity-50 z-0">
            #{String(pokemon.id).padStart(3, '0')}
          </div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -bottom-12 left-1/2 -translate-x-1/2 z-10"
          >
            {pokemon.sprites?.front_default ? (
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-40 h-40 object-contain drop-shadow-2xl"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <span className="text-gray-400 text-sm">No Image</span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Content Container */}
        <div className="pt-16 pb-6 px-6">
          {/* Header Info */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-black text-gray-800 capitalize mb-2 top-0 sticky">{pokemon.name}</h2>
            <div className="flex justify-center gap-2">
              {pokemon.types?.map((typeInfo) => (
                <span
                  key={typeInfo.type.name}
                  className="px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-sm"
                  style={{
                    backgroundColor: getPokemonTypeColor(typeInfo.type.name)
                  }}
                >
                  {typeInfo.type.name}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
            {(['about', 'stats', 'moves'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 rounded-lg text-sm font-bold capitalize transition-all duration-300 relative ${
                  activeTab === tab ? 'text-gray-800' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white shadow-sm rounded-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-50">
            <AnimatePresence mode="wait">
              {activeTab === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-2xl text-center hover:bg-gray-100 transition-colors">
                      <div className="flex justify-center items-center text-gray-400 mb-1">
                        <Ruler size={16} />
                      </div>
                      <p className="text-gray-500 text-xs font-semibold">Height</p>
                      <p className="text-lg font-bold text-gray-800">
                        {pokemon.height ? (pokemon.height / 10).toFixed(1) : '-'}m
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-2xl text-center hover:bg-gray-100 transition-colors">
                      <div className="flex justify-center items-center text-gray-400 mb-1">
                        <Weight size={16} />
                      </div>
                      <p className="text-gray-500 text-xs font-semibold">Weight</p>
                      <p className="text-lg font-bold text-gray-800">
                        {pokemon.weight ? (pokemon.weight / 10).toFixed(1) : '-'}kg
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="flex items-center gap-2 font-bold text-gray-700 text-sm mb-3">
                      <Sparkles size={16} className="text-yellow-500" />
                      Abilities
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {pokemon.abilities?.map((ability) => (
                        <span
                          key={ability.ability.name}
                          className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-xs font-bold capitalize border border-purple-100"
                        >
                          {ability.ability.name.replace('-', ' ')}
                          {ability.is_hidden && <span className="text-purple-400 ml-1 text-[10px]">(H)</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'stats' && (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  {pokemon.stats?.map((stat) => (
                    <div key={stat.stat.name} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-500 w-24 uppercase truncate">
                        {stat.stat.name.replace('special-', 'sp. ').replace('attack', 'atk').replace('defense', 'def')}
                      </span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: typeColor }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-800 w-8 text-right">{stat.base_stat}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'moves' && (
                <motion.div
                  key="moves"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="text-center space-y-4"
                >
                  <div className="grid grid-cols-2 gap-2">
                    {pokemon.moves?.slice(0, 4).map((move) => (
                      <div
                        key={move.move.name}
                        className="p-2 bg-gray-50 rounded-lg text-xs font-semibold text-gray-600 capitalize truncate"
                      >
                        {move.move.name.replace('-', ' ')}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="w-full mt-2 py-3 px-4 rounded-xl bg-gray-900 text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors group"
                  >
                    <Dumbbell size={16} className="group-hover:rotate-12 transition-transform" />
                    View All {pokemon.moves?.length || 0} Moves
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <MovesDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        moves={pokemon.moves || []}
        pokemonName={pokemon.name}
      />
    </>
  )
}
