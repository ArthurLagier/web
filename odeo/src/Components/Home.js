import React, { useEffect, useState } from 'react';
import '../Home.css';
import GameCard from '../GameCard';
import { api } from '../api';
import { useCart } from '../auth/CartContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [games, setGames] = useState([]);
  const { cart, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    api('/games')
      .then(setGames)
      .catch(err => console.error('Erreur de chargement des jeux :', err));
  }, []);

  //Logique tri
  const nouveautes = [...games].reverse().slice(0, 4);
  const promos = games.filter(game => game.prix < 10);
  const classiques = games.slice(0, 4);

  return (
    <div className="catalogue">
      {cart.length > 0 && (
        <div className="cart-summary">
          <h2>Votre Panier ({cart.length} articles)</h2>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-Item">
                <span>{item.nom}</span>
                <span> {item.prix} €</span>
                <button onClick={() => removeFromCart(item.id)} className="removeBtn">X</button>
              </div>
            ))}
          </div>
          <div className="cartFooter">
            <h3>Total: {total.toFixed(2)} €</h3>
            <button onClick={() => navigate('/payment')} className="payBtn">Payer</button>
          </div>
        </div>
      )}
      
      {/*Nouveauté*/}
      <h2 className="section-title">Les Nouveautés</h2>
      <div className="games-grid">
        {nouveautes.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {/*Bon prix*/}
      <h2 className="section-title">Bon prix</h2>
      <div className="games-grid">
        {promos.length > 0 ? (
          promos.map(game => <GameCard key={game.id} game={game} />)
        ) : (
          <p>Aucune promo en ce moment...</p>
        )}
      </div>
        {/*Classiques*/}
       <h2 className="section-title">Les Classiques</h2>
      <div className="games-grid">
        {classiques.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
        {/*Catalogue entier*/}
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