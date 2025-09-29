import React from 'react';
import { Link } from 'react-router-dom';

function GameCard({ game }) {
  return (
    <div className="game-card">
      <Link to={`/game/${game.id}`}>
        <img src={game.image_url} alt={game.titre} />
        <h3>{game.titre}</h3>
        <p>{game.prix} €</p>
      </Link>
    </div>
  );
}

export default GameCard;