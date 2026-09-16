import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SearchForm } from './components/SearchForm';
import { RequestStatus } from './components/RequestStatus';
import { PokemonList } from './components/PokemonList';
import { fetchPokemonList, fetchPokemonDetails } from './services/pokeApi';
import { Pokemon, RequestState } from './types/pokemon';

const LIMIT = 20;

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [requestState, setRequestState] = useState<RequestState>('idle');
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadPokemons = useCallback(async (currentOffset: number, isLoadMore = false) => {
    // Cancel previous request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    if (!isLoadMore) {
      setRequestState('loading');
      setPokemons([]);
    }

    try {
      const data = await fetchPokemonList(LIMIT, currentOffset, signal);
      
      setPokemons(prev => {
        if (isLoadMore) {
          // Avoid duplicates by filtering based on id
          const newPokemons = data.filter(d => !prev.some(p => p.id === d.id));
          return [...prev, ...newPokemons];
        }
        return data;
      });
      
      setHasNext(data.length === LIMIT); // Simplification, normally check the 'next' URL
      setRequestState('success');
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Request cancelled');
        return; // Do not update state if aborted
      }
      console.error(error);
      setRequestState('error');
      setErrorMsg('Error al cargar la lista de Pokémon.');
    }
  }, []);

  const searchPokemon = useCallback(async (term: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setRequestState('loading');
    setPokemons([]);

    try {
      const data = await fetchPokemonDetails(term, signal);
      setPokemons([data]);
      setHasNext(false);
      setRequestState('success');
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Request cancelled');
        return;
      }
      console.error(error);
      if (error.message === 'Pokemon not found') {
        setRequestState('empty');
      } else {
        setRequestState('error');
        setErrorMsg('Error al buscar el Pokémon.');
      }
    }
  }, []);

  const handleSearch = useCallback((term: string) => {
    if (!term) {
      setIsSearching(false);
      setOffset(0);
      loadPokemons(0);
    } else {
      setIsSearching(true);
      searchPokemon(term);
    }
  }, [loadPokemons, searchPokemon]);

  const handleLoadMore = () => {
    if (!isSearching) {
      const newOffset = offset + LIMIT;
      setOffset(newOffset);
      loadPokemons(newOffset, true);
    }
  };

  // Initial load
  useEffect(() => {
    loadPokemons(0);
  }, [loadPokemons]);

  return (
    <main className="stage">
      <header className="head">
        <p className="eyebrow">Archivo</p>
        <h1>Pokédex</h1>
        <p className="lede">Nombre, peso e imagen de cada espécimen.</p>
      </header>

      <SearchForm onSearch={handleSearch} />

      <RequestStatus state={requestState} errorMessage={errorMsg}>
        {pokemons.length > 0 && <PokemonList pokemons={pokemons} />}
      </RequestStatus>

      {requestState === 'success' && hasNext && !isSearching && (
        <div className="actions">
          <button className="btn" onClick={handleLoadMore}>Cargar más</button>
        </div>
      )}
    </main>
  );
}

export default App;
