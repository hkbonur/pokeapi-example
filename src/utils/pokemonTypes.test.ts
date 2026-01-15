import { describe, it, expect } from 'vitest'
import { getPokemonTypeColor, POKEMON_TYPE_COLORS } from './pokemonTypes'

describe('pokemonTypes', () => {
  describe('getPokemonTypeColor', () => {
    it('should return the correct color for a valid type', () => {
      expect(getPokemonTypeColor('fire')).toBe('#F08030')
      expect(getPokemonTypeColor('water')).toBe('#6890F0')
      expect(getPokemonTypeColor('grass')).toBe('#78C850')
    })

    it('should be case insensitive', () => {
      expect(getPokemonTypeColor('FIRE')).toBe('#F08030')
      expect(getPokemonTypeColor('Fire')).toBe('#F08030')
      expect(getPokemonTypeColor('FiRe')).toBe('#F08030')
    })

    it('should return default color for unknown type', () => {
      expect(getPokemonTypeColor('unknown')).toBe('#777777')
      expect(getPokemonTypeColor('')).toBe('#777777')
    })

    it('should have all expected pokemon types', () => {
      const expectedTypes = [
        'normal',
        'fire',
        'water',
        'electric',
        'grass',
        'ice',
        'fighting',
        'poison',
        'ground',
        'flying',
        'psychic',
        'bug',
        'rock',
        'ghost',
        'dragon',
        'dark',
        'steel',
        'fairy'
      ]

      expectedTypes.forEach((type) => {
        expect(POKEMON_TYPE_COLORS[type]).toBeDefined()
        expect(POKEMON_TYPE_COLORS[type]).toMatch(/^#[0-9A-F]{6}$/i)
      })
    })
  })
})
