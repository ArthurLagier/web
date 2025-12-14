import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { api } from '../api';
import '../Navbar.css'; // On va créer ce CSS juste après

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Fonction déplacée de Home.js vers ici
  const deleteAccount = async () => {
    if (!window.confirm('Supprimer définitivement votre compte ?')) return;
    try {
      await api('/auth/me', { method: 'DELETE' });
      logout();
      navigate('/'); // Redirige vers l'accueil après suppression
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <nav className="main-navbar">
      {/* PARTIE GAUCHE : Logo et Navigation */}
      <div className="nav-left">
        {/* Tu peux remettre ton logo ici si tu veux, en petit */}
        <Link to="/" className="nav-brand"><img src='Logo ode-o.png' alt="Odeo"/></Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/new-game">Ajouter un jeu</Link>
        </div>
      </div>

      {/* PARTIE DROITE : Authentification */}
      <div className="nav-right">
        {!user ? (
          // SI NON CONNECTÉ
          <div className="guest-menu">
            <Link to="/login" className="nav-btn login-btn">Login</Link>
            <Link to="/register" className="nav-btn register-btn">Register</Link>
          </div>
        ) : (
          // SI CONNECTÉ
          <div className="user-menu">
            <span className="welcome-text">Bonjour, <strong>{user.nom}</strong></span>
            <button onClick={logout} className="nav-btn logout-btn">Se déconnecter</button>
            <button onClick={deleteAccount} className="nav-btn delete-btn">Supprimer</button>
          </div>
        )}
      </div>
    </nav>
  );
}