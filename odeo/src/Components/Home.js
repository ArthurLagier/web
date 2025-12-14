import React, { useEffect, useState } from 'react';
import '../Home.css';
import GameCard from '../GameCard';
import { api } from '../api';
// On n'a plus besoin de useAuth ni Link ici pour le header

function Home() {
  const [games, setGames] = useState([]);
  
  // On ne récupère plus 'user' ni 'logout' ici, c'est dans la Navbar

  useEffect(() => {
    api('/games')
      .then(setGames)
      .catch(err => console.error('Erreur de chargement des jeux :', err));
  }, []);

  // La fonction deleteAccount a été déplacée dans Navbar.js

  // --- LOGIQUE DE TRI ---
  const nouveautes = [...games].reverse().slice(0, 4);
  const promos = games.filter(game => game.prix < 10);
  const classiques = games.slice(0, 4);

  return (
    <div className="catalogue">

      {/* J'ai supprimé toute la div "auth-container" qui était ici */}

      {/* Tu peux garder le gros logo si tu veux, ou l'enlever vu qu'il est dans la navbar */}
      
      {/* --- SECTION NOUVEAUTÉS --- */}
      <h2 className="section-title">Les Nouveautés</h2>
      <div className="games-grid">
        {nouveautes.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {/* ... Le reste de tes sections (Promos, Classiques, Tout le catalogue) ... */}
      <h2 className="section-title">Bon prix</h2>
      <div className="games-grid">
        {promos.length > 0 ? (
          promos.map(game => <GameCard key={game.id} game={game} />)
        ) : (
          <p>Aucune promo en ce moment...</p>
        )}
      </div>

       <h2 className="section-title">Les Classiques</h2>
      <div className="games-grid">
        {classiques.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      <h2 className="section-title">Tout le catalogue</h2>
      <div className="games-grid">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

    </div>
  );
}

export default Home;