import React, { useEffect, useState } from 'react';
import '../Home.css';
import GameCard from '../GameCard';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../auth/AuthContext';

function Home() {
  const [games, setGames] = useState([]);

  //  récupère l'état d'auth
  const { user, logout } = useAuth();

  useEffect(() => {
    api('/games')
      .then(setGames)
      .catch(err => console.error('Erreur de chargement des jeux :', err));
  }, []);

  // suppression de compte
  const deleteAccount = async () => {
    if (!window.confirm('Supprimer définitivement votre compte ?')) return;
    try {
      await api('/auth/me', { method: 'DELETE' });
      logout();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="catalogue">
      <div className="Navbar">WELCOME</div>

      {/*remplace Login/Register si connecté */}
      {!user ? (
        <>
          <Link to="/login" className="Login">Login</Link>
          <Link to="/register" className="Register">Register</Link>
        </>
      ) : (
        <div className="auth-inline">
          <span className="Login">Bonjour, <strong>{user.nom}</strong></span>
          <button className="as-link Register" onClick={logout}>Se déconnecter</button>
          <button className="as-link" onClick={deleteAccount} >Supprimer le compte</button>
        </div>
      )}

      <img src="Logo Ode-o.png" alt="odeo" className="logo-odeo" />
      <br />
      <h1>Catalogue de jeux</h1>
      <div className="games-grid">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

export default Home;
