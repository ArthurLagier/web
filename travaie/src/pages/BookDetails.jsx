import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import Comments from "./Comments";

const isUrl = (s = "") => /^https?:\/\//i.test(s);

export default function BookDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    api(`/games/${id}`).then(setGame).catch(console.error);
  }, [id]);

  if (!game) return <div>Chargement…</div>;

  const img = game.image || game.image_url;           // image jpg ou image url
  const imgSrc = isUrl(img) ? img : `/img/${img || "placeholder.jpg"}`;

  return (
    <div className="game-details">
      <h1>{game.nom}</h1>

      <img
        src={imgSrc}
        alt={game.nom}
        style={{ maxWidth: 640, width: "100%", height: "auto", display: "block", margin: "16px auto" }}
      />

      <p>{game.description}</p>
      <p><strong>{Number(game.prix).toFixed(2)} €</strong></p>

      <Comments gameId={game.id} />
    </div>
  );
}