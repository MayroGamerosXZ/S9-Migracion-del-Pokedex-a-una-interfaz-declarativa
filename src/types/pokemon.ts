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

export interface PokemonSprites {
  front_default: string | null;
  other?: {
    'official-artwork'?: {
      front_default: string | null;
    };
  };
  versions?: {
    'generation-v'?: {
      'black-white'?: {
        animated?: {
          front_default: string | null;
        }
      }
    }
  }
}

export interface PokemonCries {
  latest: string;
  legacy: string;
}

export interface Pokemon {
  id: number;
  name: string;
  weight: number;
  height: number;
  types: PokemonType[];
  stats: PokemonStat[];
  sprites: PokemonSprites;
  cries?: PokemonCries;
}

export interface PokemonListResult {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListResult[];
}

export type RequestState = 'idle' | 'loading' | 'success' | 'empty' | 'error';
