import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePokemonCard } from './usePokemonCard'

describe('usePokemonCard', () => {
  it('should initialize with drawer closed', () => {
    const { result } = renderHook(() => usePokemonCard())

    expect(result.current.isDrawerOpen).toBe(false)
  })

  it('should open drawer when openDrawer is called', () => {
    const { result } = renderHook(() => usePokemonCard())

    act(() => {
      result.current.openDrawer()
    })

    expect(result.current.isDrawerOpen).toBe(true)
  })

  it('should close drawer when closeDrawer is called', () => {
    const { result } = renderHook(() => usePokemonCard())

    act(() => {
      result.current.openDrawer()
    })

    expect(result.current.isDrawerOpen).toBe(true)

    act(() => {
      result.current.closeDrawer()
    })

    expect(result.current.isDrawerOpen).toBe(false)
  })

  it('should toggle drawer state multiple times', () => {
    const { result } = renderHook(() => usePokemonCard())

    expect(result.current.isDrawerOpen).toBe(false)

    act(() => {
      result.current.openDrawer()
    })
    expect(result.current.isDrawerOpen).toBe(true)

    act(() => {
      result.current.closeDrawer()
    })
    expect(result.current.isDrawerOpen).toBe(false)

    act(() => {
      result.current.openDrawer()
    })
    expect(result.current.isDrawerOpen).toBe(true)
  })
})
