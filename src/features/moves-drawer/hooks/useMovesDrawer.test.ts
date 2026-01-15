import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useMovesDrawer } from './useMovesDrawer'

describe('useMovesDrawer', () => {
  beforeEach(() => {
    // Reset body overflow style before each test
    document.body.style.overflow = 'unset'
  })

  afterEach(() => {
    // Cleanup
    document.body.style.overflow = 'unset'
  })

  describe('body scroll prevention', () => {
    it('should set body overflow to hidden when drawer is open', () => {
      const onClose = vi.fn()

      renderHook(() => useMovesDrawer({ isOpen: true, onClose }))

      expect(document.body.style.overflow).toBe('hidden')
    })

    it('should set body overflow to unset when drawer is closed', () => {
      const onClose = vi.fn()

      renderHook(() => useMovesDrawer({ isOpen: false, onClose }))

      expect(document.body.style.overflow).toBe('unset')
    })

    it('should restore body overflow when unmounted', () => {
      const onClose = vi.fn()

      const { unmount } = renderHook(() => useMovesDrawer({ isOpen: true, onClose }))

      expect(document.body.style.overflow).toBe('hidden')

      unmount()

      expect(document.body.style.overflow).toBe('unset')
    })

    it('should update body overflow when isOpen changes', () => {
      const onClose = vi.fn()

      const { rerender } = renderHook(({ isOpen }) => useMovesDrawer({ isOpen, onClose }), {
        initialProps: { isOpen: false }
      })

      expect(document.body.style.overflow).toBe('unset')

      rerender({ isOpen: true })

      expect(document.body.style.overflow).toBe('hidden')

      rerender({ isOpen: false })

      expect(document.body.style.overflow).toBe('unset')
    })
  })

  describe('keyboard handling', () => {
    it('should call onClose when Escape is pressed and drawer is open', () => {
      const onClose = vi.fn()

      renderHook(() => useMovesDrawer({ isOpen: true, onClose }))

      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' })
      document.dispatchEvent(escapeEvent)

      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('should not call onClose when Escape is pressed and drawer is closed', () => {
      const onClose = vi.fn()

      renderHook(() => useMovesDrawer({ isOpen: false, onClose }))

      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' })
      document.dispatchEvent(escapeEvent)

      expect(onClose).not.toHaveBeenCalled()
    })

    it('should not call onClose when other keys are pressed', () => {
      const onClose = vi.fn()

      renderHook(() => useMovesDrawer({ isOpen: true, onClose }))

      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' })
      document.dispatchEvent(enterEvent)

      expect(onClose).not.toHaveBeenCalled()
    })

    it('should cleanup keyboard listener on unmount', () => {
      const onClose = vi.fn()

      const { unmount } = renderHook(() => useMovesDrawer({ isOpen: true, onClose }))

      unmount()

      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' })
      document.dispatchEvent(escapeEvent)

      expect(onClose).not.toHaveBeenCalled()
    })
  })
})
