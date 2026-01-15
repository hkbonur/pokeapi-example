import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../test/test-utils'
import { LoadingState } from './LoadingState'

describe('LoadingState', () => {
  it('should render loading message', () => {
    render(<LoadingState />)

    expect(screen.getByText('Searching...')).toBeInTheDocument()
  })

  it('should render loading spinner', () => {
    const { container } = render(<LoadingState />)

    const spinner = container.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })
})
