import { useEffect, useState } from 'react';
import {
  collection, query, orderBy, limit,
  onSnapshot, addDoc, serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../auth/AuthContext'; // 👈 Import du contexte Auth
import '../Comments.css'; // 👈 On va créer ce fichier CSS

export default function Comments({ gameId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  
  // Récupération de l'utilisateur connecté
  const { user } = useAuth();

  useEffect(() => {
    const col = collection(db, 'games', String(gameId), 'comments');
    const q = query(col, orderBy('createdAt', 'desc'), limit(50));
    const unsub = onSnapshot(q, (snap) => {
      setComments(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [gameId]);

  const submit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    // On utilise le nom de l'user connecté, ou "Anonyme" si pas connecté
    const authorName = user ? user.nom : 'Anonyme';

    await addDoc(collection(db, 'games', String(gameId), 'comments'), {
      author: authorName,
      text: text.trim(),
      createdAt: serverTimestamp(),
      userId: user ? user.id : null // Optionnel : utile si tu veux modérer plus tard
    });
    setText('');
  };

  // Petite fonction pour formater la date proprement
  const formatDate = (timestamp) => {
    if (!timestamp) return ''; // Gère le délai de latence Firebase
    return timestamp.toDate().toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="comments-container">
      <h3>Commentaires ({comments.length})</h3>

      {/* Formulaire : On affiche l'input seulement si on est connecté, ou on laisse ouvert à tous */}
      <form onSubmit={submit} className="comment-form">
        <div className="input-group">
          {/* On affiche qui va poster */}
          <span className="posting-as">
            Postera en tant que : <strong>{user ? user.nom : 'Anonyme'}</strong>
          </span>
          
          <div className="input-row">
            <input
              placeholder="Écrire un commentaire…"
              value={text}
              onChange={e => setText(e.target.value)}
              className="comment-input"
            />
            <button type="submit" className="comment-btn" disabled={!text.trim()}>
              Publier
            </button>
          </div>
        </div>
      </form>

      {/* Liste des commentaires (Plus de <ul> moche !) */}
      <div className="comments-list">
        {comments.map(c => (
          <div key={c.id} className="comment-card">
            <div className="comment-header">
              <span className="comment-author">{c.author}</span>
              <span className="comment-date">{formatDate(c.createdAt)}</span>
            </div>
            <div className="comment-body">
              {c.text}
            </div>
          </div>
        ))}
        {comments.length === 0 && <p className="no-comments">Soyez le premier à commenter !</p>}
      </div>
    </div>
  );
}