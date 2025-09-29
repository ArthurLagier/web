import React, { useEffect, useState } from 'react';
import '../Home.css';
import GameCard from '../GameCard';

function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch('/api/games')
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(err => console.error("Erreur de chargement des jeux :", err));
  }, []);

  return (
    
    <div className="catalogue">
        <div className="Block"></div>
  <div className="Navbar">WELCOME</div>
  <div className="Login">Login</div>
  <div className="Register">Register</div>
  <img src="Logo Ode-o.png" alt="odeo"></img>
      <h1>Catalogue de jeux</h1>
      <div className="games-grid">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

export default Home
