import React, { useRef, useEffect } from 'react'
import { Search } from 'lucide-react'

interface Props {
  searchTerm: string
  suggestions?: string[]
  onSearchTermChange: (value: string) => void
  onSubmit: (e: React.FormEvent | string) => void
}

export function SearchForm(props: Props) {
  const [isFocused, setIsFocused] = React.useState(false)
  const wrapperRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSuggestionClick = (name: string) => {
    props.onSubmit(name)
    setIsFocused(false)
  }

  const showSuggestions = isFocused && props.suggestions && props.suggestions.length > 0

  return (
    <form onSubmit={props.onSubmit} className="max-w-2xl mx-auto mb-16" ref={wrapperRef}>
      <div className="relative">
        <input
          type="text"
          value={props.searchTerm}
          onChange={(e) => props.onSearchTermChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
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

        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl overflow-hidden z-50">
            {props.suggestions!.map((name) => (
              <button
                key={name}
                type="button"
                className="w-full px-6 py-3 text-left hover:bg-gray-100 capitalize text-lg text-gray-700 transition-colors"
                onClick={() => handleSuggestionClick(name)}
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </div>
    </form>
  )
}
