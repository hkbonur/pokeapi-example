import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSearchForm } from './useSearchForm'

describe('useSearchForm', () => {
  const defaultProps = {
    suggestions: [],
    onSearchTermChange: vi.fn(),
    onSubmit: vi.fn()
  }

  it('should initialize with suggestions hidden', () => {
    const { result } = renderHook(() => useSearchForm(defaultProps))
    expect(result.current.showSuggestions).toBe(false)
  })

  it('should show suggestions when focused and suggestions exist', () => {
    const props = {
      ...defaultProps,
      suggestions: ['pikachu']
    }
    const { result } = renderHook(() => useSearchForm(props))

    act(() => {
      result.current.handleInputFocus()
    })

    expect(result.current.showSuggestions).toBe(true)
  })

  it('should not show suggestions when focused but no suggestions', () => {
    const { result } = renderHook(() => useSearchForm(defaultProps))

    act(() => {
      result.current.handleInputFocus()
    })

    expect(result.current.showSuggestions).toBe(false) // Assuming checking length > 0
  })

  it('should update search term and show suggestions on input change', () => {
    const onSearchTermChange = vi.fn()
    const props = { ...defaultProps, onSearchTermChange, suggestions: ['charmander'] }
    const { result } = renderHook(() => useSearchForm(props))

    const event = { target: { value: 'char' } } as React.ChangeEvent<HTMLInputElement>

    act(() => {
      result.current.handleInputChange(event)
    })

    expect(onSearchTermChange).toHaveBeenCalledWith('char')
    expect(result.current.showSuggestions).toBe(true)
  })

  it('should submit and hide suggestions on suggestion click', () => {
    const onSubmit = vi.fn()
    const props = { ...defaultProps, onSubmit, suggestions: ['bulbasaur'] }
    const { result } = renderHook(() => useSearchForm(props))

    act(() => {
      result.current.handleInputFocus()
    })
    expect(result.current.showSuggestions).toBe(true)

    act(() => {
      result.current.handleSuggestionClick('bulbasaur')
    })

    expect(onSubmit).toHaveBeenCalledWith('bulbasaur')
    expect(result.current.showSuggestions).toBe(false)
  })

  it('should submit and hide suggestions on form submit', () => {
    const onSubmit = vi.fn()
    const props = { ...defaultProps, onSubmit, suggestions: ['squirtle'] }
    const { result } = renderHook(() => useSearchForm(props))

    act(() => {
      result.current.handleInputFocus()
    })
    expect(result.current.showSuggestions).toBe(true)

    const event = { preventDefault: vi.fn() } as unknown as React.FormEvent
    act(() => {
      result.current.handleSubmit(event)
    })

    expect(onSubmit).toHaveBeenCalledWith(event)
    expect(result.current.showSuggestions).toBe(false)
  })
})
