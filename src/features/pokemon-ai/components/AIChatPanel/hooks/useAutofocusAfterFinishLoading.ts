import React from 'react'

interface UseTextareaAutoResizeParams {
  value: string
  isLoading: boolean
}

export function useAutofocusAfterFinishLoading(params: UseTextareaAutoResizeParams) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const prevLoadingRef = React.useRef(params.isLoading)

  React.useEffect(() => {
    if (prevLoadingRef.current && !params.isLoading) {
      textareaRef.current?.focus()
    }
    prevLoadingRef.current = params.isLoading
  }, [params.isLoading])

  return {
    textareaRef
  }
}
