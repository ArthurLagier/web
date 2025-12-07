import React from 'react';
import '../Footer.css'; // On va créer ce fichier juste après
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        {/* Colonne 1 : Le Logo / Marque */}
        <div className="footer-section">
          <h3>Ode-o</h3>
          <p>La meilleure plateforme de jeux vidéo.</p>
        </div>

        {/* Colonne 2 : Liens utiles */}
        <div className="footer-section">
          <h4>Liens utiles</h4>
          <Link to="/">Accueil</Link>
          <Link to="/login">Connexion</Link>
          <Link to="/register">Inscription</Link>
        </div>

        {/* Colonne 3 : Contact */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>support@odeo.com</p>
          <p>12 Rue du Gaming, Paris</p>
        </div>

      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Ode-o. Tous droits réservés.
      </div>
    </footer>
  );
}

export default Footer;