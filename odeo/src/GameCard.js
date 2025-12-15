import React from 'react';
import { Link } from 'react-router-dom';
import './GameCard.css';

function GameCard({ game }) {
  return (
    <div className="game-card">
      <Link to={`/game/${game.id}`}>
        {/*  vient du dossier public ou d'une URL */}
        <img
  src={
    game.image?.startsWith('http')
      ? game.image
      : `/img/${game.image}`
  }
  alt={game.nom}
  style={{ maxWidth: '400px', maxHeight: '400px', borderRadius: '8px' }}
/>
        <h3>{game.nom}</h3>
        <p>{Number(game.prix).toFixed(2)} €</p>
      </Link>
    </div>
  );
}

export default GameCard;

