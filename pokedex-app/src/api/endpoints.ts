const BASE_URL = 'https://pokeapi.co/api/v2';

export const endpoints = {
  pokemon: (nameOrId: string | number) => `${BASE_URL}/pokemon/${nameOrId}`,
  species: (id: number) => `${BASE_URL}/pokemon-species/${id}`,
  evolutionChain: (id: number) => `${BASE_URL}/evolution-chain/${id}`,
  pokemonList: (limit: number = 20, offset: number = 0) => 
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
};

export const SPRITE_BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

export const getSpriteUrl = (id: number): string => {
  return `${SPRITE_BASE_URL}/${id}.png`;
};
