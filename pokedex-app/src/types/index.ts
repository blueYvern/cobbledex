export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
  species: {
    url: string;
    flavorText?: string;
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonSprites {
  front_default: string;
  front_shiny?: string;
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
}

export interface PokemonSpecies {
  id: number;
  name: string;
  flavor_text_entries: FlavorTextEntry[];
  evolution_chain: {
    url: string;
  };
  generation: {
    name: string;
    url: string;
  };
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
  };
  version: {
    name: string;
  };
}

export interface EvolutionChain {
  id: number;
  chain: ChainLink;
}

export interface ChainLink {
  species: {
    name: string;
    url: string;
  };
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
}

export interface EvolutionDetail {
  trigger: {
    name: string;
    url: string;
  };
  min_level: number | null;
  item: {
    name: string;
    url: string;
  } | null;
  min_happiness: number | null;
  time_of_day: string;
  location: any;
  known_move: any;
}

export interface EvolutionNode {
  id: number;
  name: string;
  image: string;
  evolvesTo: EvolutionCondition[];
}

export interface EvolutionCondition {
  pokemon: EvolutionNode;
  trigger: string;
  minLevel?: number;
  item?: string;
  condition?: string;
}
