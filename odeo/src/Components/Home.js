import React, { useEffect, useState } from 'react';
import '../Home.css';
import GameCard from '../GameCard';
import { Link } from 'react-router-dom';
import { api } from '../api';

function Home() {
  const [games, setGames] = useState([]);

 useEffect(() => {
  api('/games')
    .then(setGames)
    .catch(err => console.error('Erreur de chargement des jeux :', err));
}, []);

  return (
    
    <div className="catalogue">
        <div className="Block"></div>
  <div className="Navbar">WELCOME</div>
  <Link to="/login" className="Login">Login</Link>
  <Link to="/register" className="Register">Register</Link>
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
