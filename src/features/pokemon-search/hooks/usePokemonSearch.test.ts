import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePokemonSearch } from './usePokemonSearch'
import * as pokeapi from '../../../generated/pokeapi'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Mock the API hooks
vi.mock('../../../generated/pokeapi', () => ({
  useApiV2PokemonRetrieve: vi.fn(),
  useApiV2PokemonList: vi.fn()
}))

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false }
    }
  })

  function Wrapper(props: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, props.children)
  }

  return Wrapper
}

describe('usePokemonSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Default mock for list
    vi.mocked(pokeapi.useApiV2PokemonList).mockReturnValue({
      data: {
        data: {
          results: [
            { name: 'bulbasaur', url: '' },
            { name: 'ivysaur', url: '' },
            { name: 'pikachu', url: '' },
            { name: 'raichu', url: '' }
          ]
        }
      },
      isLoading: false,
      error: null
    } as any)
  })

  it('should initialize with empty search term and no pokemon name', () => {
    vi.mocked(pokeapi.useApiV2PokemonRetrieve).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => usePokemonSearch(), {
      wrapper: createWrapper()
    })

    expect(result.current.searchTerm).toBe('')
    expect(result.current.pokemonName).toBe(null)
    expect(result.current.pokemon).toBeUndefined()
    expect(result.current.suggestions).toEqual([])
  })

  it('should list suggestions when typing', () => {
    vi.mocked(pokeapi.useApiV2PokemonRetrieve).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => usePokemonSearch(), {
      wrapper: createWrapper()
    })

    act(() => {
      result.current.handleSearchTermChange('chu')
    })

    expect(result.current.suggestions).toEqual(['pikachu', 'raichu'])
  })

  it('should return empty suggestions for short search term', () => {
    vi.mocked(pokeapi.useApiV2PokemonRetrieve).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => usePokemonSearch(), {
      wrapper: createWrapper()
    })

    act(() => {
      result.current.handleSearchTermChange('p')
    })

    expect(result.current.suggestions).toEqual([])
  })

  it('should update search term when handleSearchTermChange is called', () => {
    vi.mocked(pokeapi.useApiV2PokemonRetrieve).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => usePokemonSearch(), {
      wrapper: createWrapper()
    })

    act(() => {
      result.current.handleSearchTermChange('pikachu')
    })

    expect(result.current.searchTerm).toBe('pikachu')
    expect(result.current.pokemonName).toBe(null)
  })

  it('should set pokemon name and trim/lowercase when handleSearch is called with event', () => {
    vi.mocked(pokeapi.useApiV2PokemonRetrieve).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => usePokemonSearch(), {
      wrapper: createWrapper()
    })

    act(() => {
      result.current.handleSearchTermChange('  Pikachu  ')
    })

    const mockEvent = { preventDefault: vi.fn() } as any

    act(() => {
      result.current.handleSearch(mockEvent)
    })

    expect(mockEvent.preventDefault).toHaveBeenCalled()
    expect(result.current.pokemonName).toBe('pikachu')
  })

  it('should set pokemon name when handleSearch is called with string', () => {
    vi.mocked(pokeapi.useApiV2PokemonRetrieve).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => usePokemonSearch(), {
      wrapper: createWrapper()
    })

    act(() => {
      result.current.handleSearch('Pikachu')
    })

    expect(result.current.searchTerm).toBe('pikachu')
    expect(result.current.pokemonName).toBe('pikachu')
  })

  it('should not set pokemon name if search term is empty or whitespace', () => {
    vi.mocked(pokeapi.useApiV2PokemonRetrieve).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => usePokemonSearch(), {
      wrapper: createWrapper()
    })

    const mockEvent = { preventDefault: vi.fn() } as any

    act(() => {
      result.current.handleSearchTermChange('   ')
      result.current.handleSearch(mockEvent)
    })

    expect(result.current.pokemonName).toBe(null)
  })

  it('should call API with enabled=false when pokemonName is null', () => {
    const mockApiHook = vi.fn().mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null
    })

    vi.mocked(pokeapi.useApiV2PokemonRetrieve).mockImplementation(mockApiHook)

    renderHook(() => usePokemonSearch(), {
      wrapper: createWrapper()
    })

    expect(mockApiHook).toHaveBeenCalledWith('', {
      query: { enabled: false }
    })
  })

  it('should update pokemonName state when search is submitted', () => {
    vi.mocked(pokeapi.useApiV2PokemonRetrieve).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => usePokemonSearch(), {
      wrapper: createWrapper()
    })

    act(() => {
      result.current.handleSearchTermChange('pikachu')
    })

    expect(result.current.pokemonName).toBe(null)

    act(() => {
      const mockEvent = { preventDefault: vi.fn() } as any
      result.current.handleSearch(mockEvent)
    })

    // After submitting search, pokemonName should be set
    expect(result.current.pokemonName).toBe('pikachu')
  })

  it('should return pokemon data from API', () => {
    const mockPokemon = {
      data: {
        id: 25,
        name: 'pikachu',
        sprites: {},
        types: []
      }
    }

    vi.mocked(pokeapi.useApiV2PokemonRetrieve).mockReturnValue({
      data: mockPokemon,
      isLoading: false,
      error: null
    } as any)

    const { result } = renderHook(() => usePokemonSearch(), {
      wrapper: createWrapper()
    })

    expect(result.current.pokemon).toEqual(mockPokemon.data)
  })

  it('should expose loading and error states from API', () => {
    const mockError = new Error('Not found')

    vi.mocked(pokeapi.useApiV2PokemonRetrieve).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: mockError
    } as any)

    const { result } = renderHook(() => usePokemonSearch(), {
      wrapper: createWrapper()
    })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.error).toBe(mockError)
  })
})
