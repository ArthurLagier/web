import { useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

export default function NewGame() {
  const [form, setForm] = useState({
    nom: '',
    description: '',
    prix: '',
    image: '',          // URL (nom.jpg image si depuis /public/img)
    id_categorie: '',
    id_type_game: ''
  });
  const [msg, setMsg]   = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    setBusy(true);
    try {
      // cast prix nombre et ids entier
      const body = {
        ...form,
        prix: Number(form.prix),
        id_categorie: Number(form.id_categorie),
        id_type_game: Number(form.id_type_game),
      };
      const game = await api('/games', { method: 'POST', body });
      setMsg('Jeu créé');
      // Redirige fiche jeu
      setTimeout(() => navigate(`/game/${game.id}`), 600);
    } catch (err) {
      setMsg(err.message || 'Erreur lors de la création');
    } finally {
      setBusy(false);
    }
  };
/*Formulaire informations*/
  return (
    <div style={{ maxWidth: 640, margin: '2rem auto' }}>
      <h1>Nouveau jeu</h1>
      <form onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
        <input placeholder="Nom" value={form.nom} onChange={set('nom')} required />
        <textarea placeholder="Description" value={form.description} onChange={set('description')} rows={4} />
        <input placeholder="Prix (ex: 12.99)" type="number" step="0.01" value={form.prix} onChange={set('prix')} required />
        <input placeholder="Image (URL ou nom de fichier)" value={form.image} onChange={set('image')} />
        <input placeholder="ID catégorie (ex: 1)" type="number" value={form.id_categorie} onChange={set('id_categorie')} required />
        <input placeholder="ID type de jeu (ex: 1)" type="number" value={form.id_type_game} onChange={set('id_type_game')} required />

        <button type="submit" disabled={busy}>{busy ? 'Envoi…' : 'Créer'}</button>
      </form>

      <p style={{ marginTop: 12 }}>{msg}</p>
      <p style={{ opacity: .7 }}>
      </p>
    </div>
  );
}