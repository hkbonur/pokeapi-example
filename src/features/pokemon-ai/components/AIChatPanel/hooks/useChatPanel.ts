import React from 'react'

interface UseChatPanelParams {
  messagesLength: number
}

export function useChatPanel(params: UseChatPanelParams) {
  const [isOpen, setIsOpen] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const handleOpen = React.useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleClose = React.useCallback(() => {
    setIsOpen(false)
  }, [])

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [params.messagesLength])

  return {
    isOpen,
    scrollRef,
    handleOpen,
    handleClose
  }
}
