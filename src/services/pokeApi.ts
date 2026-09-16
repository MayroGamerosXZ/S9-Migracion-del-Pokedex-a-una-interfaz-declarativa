import type { Pokemon, PokemonListResponse } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchAllPokemonNames = async (signal?: AbortSignal): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=10000`, { signal });
  if (!response.ok) {
    throw new Error('Failed to fetch pokemon names');
  }
  const data: PokemonListResponse = await response.json();
  return data.results.map(p => p.name);
};

export const fetchPokemonList = async (limit: number, offset: number, signal?: AbortSignal): Promise<Pokemon[]> => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`, { signal });
  if (!response.ok) {
    throw new Error('Failed to fetch pokemon list');
  }
  const data: PokemonListResponse = await response.json();
  
  // Fetch details for each pokemon concurrently
  const promises = data.results.map(pokemon => fetchPokemonDetails(pokemon.name, signal));
  return Promise.all(promises);
};

export const fetchPokemonDetails = async (nameOrId: string | number, signal?: AbortSignal): Promise<Pokemon> => {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`, { signal });
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Pokemon not found');
    }
    throw new Error('Failed to fetch pokemon details');
  }
  return response.json();
};
