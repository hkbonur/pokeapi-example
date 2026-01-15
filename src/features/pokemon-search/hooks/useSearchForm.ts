import React, { useRef, useEffect, useState } from 'react'

interface UseSearchFormProps {
  suggestions?: string[]
  onSearchTermChange: (value: string) => void
  onSubmit: (e: React.FormEvent | string) => void
}

export function useSearchForm({ suggestions, onSearchTermChange, onSubmit }: UseSearchFormProps) {
  const [isFocused, setIsFocused] = useState(false)
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
    onSubmit(name)
    setIsFocused(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    setIsFocused(false)
    onSubmit(e)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(e.target.value)
    setIsFocused(true)
  }

  const handleInputFocus = () => {
    setIsFocused(true)
  }

  const showSuggestions = isFocused && suggestions && suggestions.length > 0

  return {
    wrapperRef,
    showSuggestions,
    handleSuggestionClick,
    handleSubmit,
    handleInputChange,
    handleInputFocus
  }
}
