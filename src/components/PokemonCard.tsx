import React, { useState } from 'react';
import type { Pokemon } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const primaryType = pokemon.types[0]?.type.name || 'normal';
  
  const weightKg = (pokemon.weight / 10).toFixed(1);
  
  // Prefer animated sprite if available, fallback to official artwork or front default
  const animatedSprite = pokemon.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default;
  const officialArtwork = pokemon.sprites.other?.['official-artwork']?.front_default;
  const imageUrl = animatedSprite || officialArtwork || pokemon.sprites.front_default || '';
  
  const cryUrl = pokemon.cries?.latest || '';

  const handlePlayAudio = () => {
    if (cryUrl && !isPlaying) {
      const audio = new Audio(cryUrl);
      audio.volume = 0.3;
      setIsPlaying(true);
      audio.play();
      audio.onended = () => setIsPlaying(false);
    }
  };

  const statsToKeep = ['hp', 'attack', 'defense'];
  const filteredStats = pokemon.stats.filter(s => statsToKeep.includes(s.stat.name));

  return (
    <article 
      className={`pokemon-card ${isPlaying ? 'playing-audio' : ''}`}
      data-name={pokemon.name}
      style={{ '--type-color': `var(--type-${primaryType})` } as React.CSSProperties}
    >
      <div className="viewport" data-audio={cryUrl} onClick={handlePlayAudio} style={{ cursor: cryUrl ? 'pointer' : 'default' }}>
        <img src={imageUrl} alt={pokemon.name} style={{ imageRendering: animatedSprite ? 'pixelated' : 'auto' }} />
      </div>
      <h2>{pokemon.name}</h2>
      <div className="types">
        {pokemon.types.map(t => (
          <span key={t.type.name} className="type-badge" style={{ background: `var(--type-${t.type.name})` }}>
            {t.type.name}
          </span>
        ))}
      </div>
      <p className="weight"><span>Peso</span> {weightKg} kg</p>
      <div className="stats">
        {filteredStats.map(s => {
          const shortName = s.stat.name === 'attack' ? 'atk' : s.stat.name === 'defense' ? 'def' : 'hp';
          const percentage = Math.min(100, (s.base_stat / 255) * 100);
          return (
            <div key={s.stat.name} className="stat-row">
              <span className="stat-name">{shortName}</span>
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: `${percentage}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
};
