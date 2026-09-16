import React from 'react';
import type { Pokemon } from '../types/pokemon';
import { PokemonCard } from './PokemonCard';

interface PokemonListProps {
  pokemons: Pokemon[];
}

export const PokemonList: React.FC<PokemonListProps> = ({ pokemons }) => {
  return (
    <section className="dex" aria-label="Lista de Pokémon">
      {pokemons.map(pokemon => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </section>
  );
};
