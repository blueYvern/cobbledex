import { getSpriteUrl as getSprite } from '../api/endpoints';

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const extractIdFromUrl = (url: string): number => {
  const matches = url.match(/\/(\d+)\//);
  return matches ? parseInt(matches[1], 10) : 0;
};

export const formatPokemonId = (id: number): string => {
  return `#${id.toString().padStart(3, '0')}`;
};

export const formatHeight = (height: number): string => {
  // Height is in decimeters, convert to meters
  const meters = height / 10;
  return `${meters.toFixed(1)} m`;
};

export const formatWeight = (weight: number): string => {
  // Weight is in hectograms, convert to kg
  const kg = weight / 10;
  return `${kg.toFixed(1)} kg`;
};

export const getStatName = (stat: string): string => {
  const statNames: Record<string, string> = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: 'Speed',
  };
  return statNames[stat] || capitalize(stat);
};

export const getSpriteUrl = getSprite;
