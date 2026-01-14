import React from 'react'

export function usePokemonCard() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

  const openDrawer = React.useCallback(() => {
    setIsDrawerOpen(true)
  }, [])

  const closeDrawer = React.useCallback(() => {
    setIsDrawerOpen(false)
  }, [])

  return {
    isDrawerOpen,
    openDrawer,
    closeDrawer
  }
}
