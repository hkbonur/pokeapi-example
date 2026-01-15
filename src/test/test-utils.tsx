import React from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  })
}

interface AllTheProvidersProps {
  children: React.ReactNode
}

function AllTheProviders(props: AllTheProvidersProps) {
  const [queryClient] = React.useState(() => createTestQueryClient())

  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
}

function customRender(ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: AllTheProviders, ...options })
}

export * from '@testing-library/react'
export { customRender as render }
