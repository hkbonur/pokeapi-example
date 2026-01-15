import React from 'react'
import { Search } from 'lucide-react'

interface Props {
  searchTerm: string
  onSearchTermChange: (_value: string) => void
  onSubmit: (_e: React.FormEvent) => void
}

export function SearchForm(props: Props) {
  return (
    <form onSubmit={props.onSubmit} className="max-w-2xl mx-auto mb-16">
      <div className="relative">
        <input
          type="text"
          value={props.searchTerm}
          onChange={(e) => props.onSearchTermChange(e.target.value)}
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
  )
}
