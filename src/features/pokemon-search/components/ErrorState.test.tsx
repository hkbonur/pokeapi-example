import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../test/test-utils'
import { ErrorState } from './ErrorState'

describe('ErrorState', () => {
  it('should render error message with pokemon name', () => {
    render(<ErrorState pokemonName="pikachu" />)

    expect(screen.getByText('Pokémon Not Found!')).toBeInTheDocument()
    expect(screen.getByText(/No Pokémon found with the name "pikachu"/)).toBeInTheDocument()
  })

  it('should display the correct pokemon name in the error message', () => {
    render(<ErrorState pokemonName="charizard" />)

    expect(screen.getByText(/charizard/)).toBeInTheDocument()
  })

  it('should handle null pokemon name', () => {
    render(<ErrorState pokemonName={null} />)

    expect(screen.getByText(/No Pokémon found with the name ""/)).toBeInTheDocument()
  })
})
