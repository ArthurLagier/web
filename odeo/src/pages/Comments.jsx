import { useEffect, useState } from 'react';
import {
  collection, query, orderBy, limit,
  onSnapshot, addDoc, serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';

export default function Comments({ gameId }) {
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

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
    await addDoc(collection(db, 'games', String(gameId), 'comments'), {
      author: author || 'Anonyme',
      text: text.trim(),
      createdAt: serverTimestamp(),
    });
    setText('');
  };

  return (
    <div className="comments">
      <h3>Commentaires</h3>

      <form onSubmit={submit} style={{marginBottom: 16}}>
        <input
          placeholder="Votre nom (optionnel)"
          value={author}
          onChange={e=>setAuthor(e.target.value)}
          style={{marginRight: 8}}
        />
        <input
          placeholder="Écrire un commentaire…"
          value={text}
          onChange={e=>setText(e.target.value)}
          style={{width: 300, marginRight: 8}}
        />
        <button type="submit">Publier</button>
      </form>

      <ul>
        {comments.map(c => (
          <li key={c.id} style={{marginBottom: 8}}>
            <b>{c.author || 'Anonyme'}</b> —{' '}
            <span>{c.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}