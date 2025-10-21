import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { api } from '../api';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onDeleteAccount = async () => {
    if (!window.confirm('Supprimer définitivement votre compte ?')) return;
    try {
      await api('/auth/me', { method: 'DELETE' });
      logout();
      navigate('/'); // retour accueil
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <header className="App-header" style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:16}}>
      <nav>
        <Link to="/">Home</Link>{" | "}
        <Link to="/new-game">Ajouter un jeu</Link>
      </nav>

      {!user ? (
        <nav>
          <Link to="/login">Login</Link>{" | "}
          <Link to="/register">Register</Link>
        </nav>
      ) : (
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <span>Connecté : <strong>{user.nom}</strong></span>
          <button onClick={() => { logout(); navigate('/'); }}>Se déconnecter</button>
          <button onClick={onDeleteAccount} style={{color:'#f55'}}>Supprimer le compte</button>
        </div>
      )}
    </header>
  );
}