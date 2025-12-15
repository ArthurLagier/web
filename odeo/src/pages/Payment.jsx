import React, { useState } from 'react';
import { useCart } from '../auth/CartContext';
import { useNavigate } from 'react-router-dom';
import '../Payment.css';

export default function Payment() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();

  // États pour les champs du formulaire
  const [formData, setFormData] = useState({
    nom: '',
    adresse: '',
    carte: '',
    crypto: ''
  });

  // Si le panier est vide, on redirige ou on affiche un message
  if (cart.length === 0) {
    return (
      <div className="payment-container empty">
        <h2>Votre panier est vide</h2>
        <button onClick={() => navigate('/')} className="back-btn">Retour au catalogue</button>
      </div>
    );
  }

  // Gestion des changements dans les inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Simulation du paiement
  const handlePayment = (e) => {
    e.preventDefault();
    
    // Ici, tu pourrais ajouter une validation (ex: vérifier que les champs sont remplis)
    if(!formData.nom || !formData.carte) {
        alert("Veuillez remplir les informations de paiement.");
        return;
    }

    // Simulation d'un délai de traitement
    const confirm = window.confirm(`Confirmer le paiement de ${total.toFixed(2)} € ?`);
    
    if (confirm) {
      clearCart(); // On vide le panier
      alert("Paiement accepté ! Merci pour votre achat.");
      navigate('/'); // On retourne à l'accueil
    }
  };

  return (
    <div className="payment-page">
      <h1 className="payment-title">Finaliser la commande</h1>

      <div className="payment-content">
        {/*liste jeux*/}
        <div className="order-summary">
          <h3>Récapitulatif</h3>
          <ul className="summary-list">
            {cart.map((item) => (
              <li key={item.id} className="summary-item">
                <span>{item.nom}</span>
                <span>{item.prix} €</span>
              </li>
            ))}
          </ul>
          <div className="total-row">
            <strong>Total à payer :</strong>
            <span className="total-price">{total.toFixed(2)} €</span>
          </div>
        </div>

        {/*formulaire carte banquaire*/}
        <form className="payment-form" onSubmit={handlePayment}>
          <h3>Informations de paiement</h3>
          
          <label>Nom du titulaire</label>
          <input 
            type="text" 
            name="nom" 
            placeholder="Jean Dupont" 
            value={formData.nom} 
            onChange={handleChange} 
            required 
          />

          <label>Adresse de facturation</label>
          <input 
            type="text" 
            name="adresse" 
            placeholder="12 rue du Gaming, Paris" 
            value={formData.adresse} 
            onChange={handleChange} 
          />

          <label>Numéro de carte</label>
          <input 
            type="text" 
            name="carte" 
            placeholder="XXXX XXXX XXXX XXXX" 
            maxLength="19"
            value={formData.carte} 
            onChange={handleChange} 
            required 
          />

          <div className="row-inputs">
            <div>
                <label>Date d'expiration</label>
                <input type="text" placeholder="MM/YY" maxLength="5" />
            </div>
            <div>
                <label>CVC</label>
                <input type="text" name="crypto" placeholder="123" maxLength="3" required />
            </div>
          </div>

          <button type="submit" className="confirm-pay-btn">
            Payer {total.toFixed(2)} €
          </button>
        </form>
      </div>
    </div>
  );
}