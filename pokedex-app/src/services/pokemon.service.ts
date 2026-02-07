import { pokeApi } from '../api/pokeapi';
import { Pokemon, PokemonSpecies } from '../types';

export class PokemonService {
  async getPokemonDetails(nameOrId: string | number) {
    // Fetch Pokemon data
    const pokemon = await pokeApi.getPokemon(nameOrId);
    
    // Fetch species data for flavor text
    const species = await pokeApi.getSpecies(pokemon.id);
    
    // Get English flavor text
    const flavorText = this.getEnglishFlavorText(species);
    
    return {
      ...pokemon,
      species: {
        ...pokemon.species,
        flavorText,
        generation: species.generation.name,
      },
    };
  }

  private getEnglishFlavorText(species: PokemonSpecies): string {
    const englishEntry = species.flavor_text_entries.find(
      (entry) => entry.language.name === 'en'
    );
    
    if (!englishEntry) return 'No description available.';
    
    // Clean up the text (remove form feeds and extra spaces)
    return englishEntry.flavor_text
      .replace(/\f/g, ' ')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  async searchPokemon(query: string) {
    const normalizedQuery = query.toLowerCase().trim();
    
    // If it's a number, search by ID
    if (!isNaN(Number(normalizedQuery))) {
      try {
        return await this.getPokemonDetails(Number(normalizedQuery));
      } catch (error) {
        throw new Error('Pokemon not found');
      }
    }
    
    // Otherwise search by name
    try {
      return await this.getPokemonDetails(normalizedQuery);
    } catch (error) {
      throw new Error('Pokemon not found');
    }
  }
}

export const pokemonService = new PokemonService();
