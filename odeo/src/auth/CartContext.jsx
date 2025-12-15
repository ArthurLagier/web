import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  // On essaie de récupérer le panier sauvegardé dans le navigateur (localStorage)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('odeo_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sauvegarde changement panier
  useEffect(() => {
    localStorage.setItem('odeo_cart', JSON.stringify(cart));
  }, [cart]);

  // Ajouter un jeu
  const addToCart = (game) => {
    // Vérification doublon
    if (!cart.find(item => item.id === game.id)) {
      setCart([...cart, game]);
      alert(`${game.nom} ajouté au panier !`);
    } else {
      alert("Ce jeu est déjà dans votre panier !");
    }
  };

  // Enlever un jeu
  const removeFromCart = (gameId) => {
    setCart(cart.filter(item => item.id !== gameId));
  };

  // Vider panier après achat
  const clearCart = () => {
    setCart([]);
  };

  // Calcul total
  const total = cart.reduce((acc, game) => acc + parseFloat(game.prix), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}