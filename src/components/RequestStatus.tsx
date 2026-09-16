import React from 'react';
import { RequestState } from '../types/pokemon';

interface RequestStatusProps {
  state: RequestState;
  loadingCount?: number;
  errorMessage?: string;
  children: React.ReactNode;
}

export const RequestStatus: React.FC<RequestStatusProps> = ({ state, loadingCount = 20, errorMessage, children }) => {
  if (state === 'loading' && !children) {
    return (
      <section className="dex" aria-label="Cargando Pokémon">
        {Array.from({ length: loadingCount }).map((_, i) => (
          <article key={i} className="pokemon-card pokemon-card--skeleton">
            <div className="viewport"></div>
            <div className="skeleton-text"></div>
            <div className="types">
              <div className="skeleton-badge"></div>
            </div>
            <div className="skeleton-text" style={{ width: '80%', height: '12px' }}></div>
          </article>
        ))}
      </section>
    );
  }

  if (state === 'error') {
    return (
      <section className="dex">
        <article className="pokemon-card pokemon-card--empty">
          <h2>Error</h2>
          <p>{errorMessage || 'Ocurrió un error inesperado.'}</p>
        </article>
      </section>
    );
  }

  if (state === 'empty') {
    return (
      <section className="dex">
        <article className="pokemon-card pokemon-card--empty">
          <div className="viewport viewport--empty" aria-hidden="true"></div>
          <h2>Sin resultados</h2>
          <p className="weight"><span>Peso</span> —</p>
        </article>
      </section>
    );
  }

  return <>{children}</>;
};
