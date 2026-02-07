export const colors = {
  primary: '#DC0A2D',
  secondary: '#3B4CCA',
  
  background: {
    light: '#FFFFFF',
    dark: '#1A1A1A',
  },
  
  text: {
    primary: '#1D1D1D',
    secondary: '#666666',
    light: '#FFFFFF',
  },
  
  types: {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  },
  
  stat: {
    hp: '#FF5959',
    attack: '#F5AC78',
    defense: '#FAE078',
    specialAttack: '#9DB7F5',
    specialDefense: '#A7DB8D',
    speed: '#FA92B2',
  },
};

export type TypeColor = keyof typeof colors.types;
