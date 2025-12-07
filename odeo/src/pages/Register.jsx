import { useState } from 'react';
import { api } from '../api';

// Vous pouvez placer cette fonction dans un fichier utilitaire et l'importer
// (C'est la même RegEx que côté backend)
function isPasswordStrong(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]).{12,}$/;
  return passwordRegex.test(password);
}

export default function Register() {
  const [form, setForm] = useState({ nom: '', email: '', password: '' });
  const [msg, setMsg] = useState('');
  
  // 👇 État séparé pour les erreurs de validation
  const [validationError, setValidationError] = useState(''); 

  const submit = async (e) => {
    e.preventDefault();

    // 👇 --- AJOUT DE LA VALIDATION CÔTÉ CLIENT ---
    if (!isPasswordStrong(form.password)) {
      setValidationError(
        'Le mot de passe doit contenir au minimum 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.'
      );
      setMsg(''); // Vider le message de succès/erreur API
      return; // Arrêter la soumission
    }
    // 👆 --- FIN DE L'AJOUT ---

    try {
      const { user, token } = await api('/auth/register', { method: 'POST', body: form });
      // Si l'API est appelée, la validation est réussie, on vide l'erreur
      setValidationError(''); 
      localStorage.setItem('token', token);
      setMsg(`Bienvenue ${user.nom} !`);
    } catch (e) {
      setValidationError(''); // Vider l'erreur de validation
      setMsg(e.message); // Afficher l'erreur de l'API (ex: "Email déjà pris")
    }
  };

  const handlePasswordChange = (e) => {
    // On vide l'erreur de validation dès que l'utilisateur re-tape
    if (validationError) {
      setValidationError('');
    }
    setForm({ ...form, password: e.target.value });
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Nom"
        value={form.nom}
        onChange={(e) => setForm({ ...form, nom: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Mot de passe"
        type="password"
        value={form.password}
        onChange={handlePasswordChange} // 👈 Utiliser le handler
      />
      
      {/* Afficher l'erreur de validation (si elle existe) */}
      {validationError && (
        <div style={{ color: 'red' }}>{validationError}</div>
      )}
      
      <button type="submit">Créer mon compte</button>
      
      {/* Afficher le message de succès/erreur de l'API */}
      <div>{msg}</div>
    </form>
  );
}
/*
import { useState } from 'react';
import { api } from '../api';

export default function Register() {
  const [form, setForm] = useState({ nom:'', email:'', password:'' });
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { user, token } = await api('/auth/register', { method:'POST', body: form });
      localStorage.setItem('token', token);
      setMsg(`Bienvenue ${user.nom} !`);
    } catch (e) { setMsg(e.message); }
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Nom" value={form.nom} onChange={e=>setForm({...form, nom:e.target.value})}/>
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
      <input placeholder="Mot de passe" type="password" value={form.password}
             onChange={e=>setForm({...form, password:e.target.value})}/>
      <button type="submit">Créer mon compte</button>
      <div>{msg}</div>
    </form>
  );
}*/