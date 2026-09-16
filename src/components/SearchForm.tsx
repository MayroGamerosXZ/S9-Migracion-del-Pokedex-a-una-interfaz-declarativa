import React, { useState, useEffect } from 'react';
import { fetchAllPokemonNames } from '../services/pokeApi';

interface SearchFormProps {
  onSearch: (term: string) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;
    fetchAllPokemonNames().then(names => {
      if (isMounted) setSuggestions(names);
    }).catch(console.error);
    
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm.trim().toLowerCase());
    }, 400); // 400ms debounce

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm.trim().toLowerCase());
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <label className="search">
        Buscar Pokémon
        <input
          type="search"
          name="pokemon"
          list="pokemon-suggestions"
          placeholder="Ejemplo: ditto"
          autoComplete="off"
          spellCheck="false"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <datalist id="pokemon-suggestions">
          {suggestions.map(name => (
            <option key={name} value={name} />
          ))}
        </datalist>
      </label>
    </form>
  );
};
