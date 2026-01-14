import React from 'react'

export function useMoveItem() {
  const [isExpanded, setIsExpanded] = React.useState(false)

  const toggleExpanded = React.useCallback(() => {
    setIsExpanded((prev) => !prev)
  }, [])

  return {
    isExpanded,
    toggleExpanded
  }
}
