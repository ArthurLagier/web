import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import Comments from "./Comments";
import '../GameDetails.css'; // N'oublie pas de créer ce fichier !

const isUrl = (s = "") => /^https?:\/\//i.test(s);

export default function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    api(`/games/${id}`).then(setGame).catch(console.error);
  }, [id]);

  if (!game) return <div className="loading">Chargement…</div>;

  const img = game.image || game.image_url;
  const imgSrc = isUrl(img) ? img : `/img/${img || "placeholder.jpg"}`;

  return (
    <div className="game-details-page">
      
      {/* --- BLOC PRINCIPAL (HERO) --- */}
      <div className="game-hero">
        
        {/* COLONNE GAUCHE : TEXTE */}
        <div className="game-info">
          <h1>{game.nom}</h1>
          <p className="description">{game.description}</p>
          
          <div className="buy-section">
            <span className="price">{Number(game.prix).toFixed(2)} €</span>
            <button className="buy-btn">Ajouter au panier</button>
          </div>
        </div>

        {/* COLONNE DROITE : IMAGE */}
        <div className="game-visual">
          <img
            src={imgSrc}
            alt={game.nom}
            className="game-cover"
          />
        </div>

      </div>

      {/* --- SECTION COMMENTAIRES (EN DESSOUS) --- */}
      <div className="comments-section">
        <Comments gameId={game.id} />
      </div>

    </div>
  );
}