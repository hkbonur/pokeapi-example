import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useMoveItem } from './useMoveItem'

describe('useMoveItem', () => {
  it('should initialize with isExpanded as false', () => {
    const { result } = renderHook(() => useMoveItem())

    expect(result.current.isExpanded).toBe(false)
  })

  it('should toggle expansion state', () => {
    const { result } = renderHook(() => useMoveItem())

    act(() => {
      result.current.toggleExpanded()
    })

    expect(result.current.isExpanded).toBe(true)

    act(() => {
      result.current.toggleExpanded()
    })

    expect(result.current.isExpanded).toBe(false)
  })

  it('should handle multiple toggles correctly', () => {
    const { result } = renderHook(() => useMoveItem())

    for (let i = 1; i <= 5; i++) {
      act(() => {
        result.current.toggleExpanded()
      })

      const expectedValue = i % 2 === 1
      expect(result.current.isExpanded).toBe(expectedValue)
    }
  })
})
