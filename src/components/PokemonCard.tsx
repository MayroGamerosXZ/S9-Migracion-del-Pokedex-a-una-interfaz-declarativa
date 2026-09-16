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

  const typeTranslations: Record<string, string> = {
    normal: 'normal', fighting: 'lucha', flying: 'volador',
    poison: 'veneno', ground: 'tierra', rock: 'roca',
    bug: 'bicho', ghost: 'fantasma', steel: 'acero',
    fire: 'fuego', water: 'agua', grass: 'planta',
    electric: 'eléctrico', psychic: 'psíquico', ice: 'hielo',
    dragon: 'dragón', dark: 'siniestro', fairy: 'hada'
  };

  const speakDescription = () => {
    if (!('speechSynthesis' in window)) return;
    
    // Cancelar cualquier audio de voz previo
    window.speechSynthesis.cancel();
    
    const translatedTypes = pokemon.types.map(t => typeTranslations[t.type.name] || t.type.name).join(' y ');
    const text = `${pokemon.name}. Pokémon de tipo ${translatedTypes}.`;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    // Configurar el final de la reproducción general
    utterance.onend = () => setIsPlaying(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const handlePlayAudio = () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    
    if (cryUrl) {
      const audio = new Audio(cryUrl);
      audio.volume = 0.3;
      audio.play();
      audio.onended = () => {
        // Después del grito, hablar la descripción
        speakDescription();
      };
    } else {
      // Si no hay grito, hablar directamente
      speakDescription();
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
