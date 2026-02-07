import { ChainLink, EvolutionNode, EvolutionCondition } from '../types';
import { extractIdFromUrl, getSpriteUrl } from '../utils/helpers';
import { pokeApi } from '../api/pokeapi';

export class EvolutionService {
  async getEvolutionChain(pokemonId: number): Promise<EvolutionNode[]> {
    // Get species to find evolution chain ID
    const species = await pokeApi.getSpecies(pokemonId);
    const chainId = extractIdFromUrl(species.evolution_chain.url);
    
    // Get evolution chain
    const evolutionChain = await pokeApi.getEvolutionChain(chainId);
    
    // Parse and return
    return this.parseEvolutionChain(evolutionChain.chain);
  }

  parseEvolutionChain(chain: ChainLink): EvolutionNode[] {
    const nodes: EvolutionNode[] = [];

    const traverse = (link: ChainLink): EvolutionNode => {
      const pokemonId = extractIdFromUrl(link.species.url);

      const node: EvolutionNode = {
        id: pokemonId,
        name: link.species.name,
        image: getSpriteUrl(pokemonId),
        evolvesTo: [],
      };

      // Parse each evolution branch
      link.evolves_to.forEach((evolution) => {
        const childNode = traverse(evolution);
        const details = evolution.evolution_details[0]; // Use first condition

        const condition: EvolutionCondition = {
          pokemon: childNode,
          trigger: details.trigger.name,
        };

        // Add specific conditions
        if (details.min_level) {
          condition.minLevel = details.min_level;
        }
        if (details.item) {
          condition.item = details.item.name;
        }
        if (details.min_happiness) {
          condition.condition = 'high-friendship';
        }
        if (details.time_of_day) {
          condition.condition = `during ${details.time_of_day}`;
        }

        node.evolvesTo.push(condition);
      });

      nodes.push(node);
      return node;
    };

    traverse(chain);
    return nodes;
  }

  formatEvolutionCondition(condition: EvolutionCondition): string {
    if (condition.minLevel) {
      return `Level ${condition.minLevel}`;
    }
    if (condition.item) {
      return `Use ${this.formatItemName(condition.item)}`;
    }
    if (condition.trigger === 'trade') {
      return condition.item ? `Trade holding ${this.formatItemName(condition.item)}` : 'Trade';
    }
    if (condition.condition) {
      return this.capitalize(condition.condition.replace(/-/g, ' '));
    }
    return 'Unknown';
  }

  private formatItemName(item: string): string {
    return item
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export const evolutionService = new EvolutionService();
