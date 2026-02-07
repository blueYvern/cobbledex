import { endpoints } from './endpoints';
import { Pokemon, PokemonSpecies, EvolutionChain } from '../types';

class PokeAPIClient {
  private async fetch<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error('Network error. Please check your connection.');
      }
      throw error;
    }
  }

  async getPokemon(nameOrId: string | number): Promise<Pokemon> {
    return this.fetch<Pokemon>(endpoints.pokemon(nameOrId));
  }

  async getSpecies(id: number): Promise<PokemonSpecies> {
    return this.fetch<PokemonSpecies>(endpoints.species(id));
  }

  async getEvolutionChain(id: number): Promise<EvolutionChain> {
    return this.fetch<EvolutionChain>(endpoints.evolutionChain(id));
  }

  async searchPokemon(limit: number = 20, offset: number = 0) {
    return this.fetch<{ results: Array<{ name: string; url: string }> }>(
      endpoints.pokemonList(limit, offset)
    );
  }
}

export const pokeApi = new PokeAPIClient();
