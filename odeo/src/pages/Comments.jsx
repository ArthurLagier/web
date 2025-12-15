import { useEffect, useState } from 'react';
import {
  collection, query, orderBy, limit,
  onSnapshot, addDoc, serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../auth/AuthContext';
import '../Comments.css';

export default function Comments({ gameId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  
  // user connecté
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

    // nom user ou Anonyme
    const authorName = user ? user.nom : 'Anonyme';

    await addDoc(collection(db, 'games', String(gameId), 'comments'), {
      author: authorName,
      text: text.trim(),
      createdAt: serverTimestamp(),
      userId: user ? user.id : null // pour récuperer l'id si user null
    });
    setText('');
  };

  // Date
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    return timestamp.toDate().toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="comments-container">
      <h3>Commentaires ({comments.length})</h3>

      {/*prend le nom uttilisateur pour le commentaire*/}
      <form onSubmit={submit} className="comment-form">
        <div className="input-group">
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

      {/* Liste commentaires*/}
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