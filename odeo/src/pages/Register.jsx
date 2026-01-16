import { useState } from 'react';
import { api } from '../api';
import '../Logreg.css';
function isPasswordStrong(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]).{12,}$/;
  return passwordRegex.test(password);
}

export default function Register() {
  const [form, setForm] = useState({ nom: '', email: '', password: '' });
  const [msg, setMsg] = useState('');
  const [validationError, setValidationError] = useState(''); 

  const submit = async (e) => {
    e.preventDefault();

    // Validation
    if (!isPasswordStrong(form.password)) {
      setValidationError(
        'Le mot de passe doit contenir au minimum 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.'
      );
      setMsg('');
      return;
    }

    try {
      const { user, token } = await api('/auth/register', { method: 'POST', body: form });
      setValidationError(''); 
      localStorage.setItem('token', token);
      setMsg(`Bienvenue ${user.nom} !`);
    } catch (e) {
      setValidationError('');
      setMsg(e.message); //Afficher erreur API (ex: "Email pris")
    }
  };

  const handlePasswordChange = (e) => {
    if (validationError) {
      setValidationError('');
    }
    setForm({ ...form, password: e.target.value });
  };

  return (
    <form onSubmit={submit}>
      <div className='boxall'><div><input className='inputtext'
        placeholder="Nom"
        value={form.nom}
        onChange={(e) => setForm({ ...form, nom: e.target.value })}
      /></div>
      <div><input className='inputtext'
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      /></div>
      <div><input className='inputtext'
        placeholder="Mot de passe"
        type="password"
        value={form.password}
        onChange={handlePasswordChange}
      /></div></div>
      
      {/* Afficher erreur validation*/}
      {validationError && (
        <div style={{ color: 'red' }}>{validationError}</div>
      )}
      
      <div><button className='btn' type="submit">Créer mon compte</button></div>
      
      {/*Affiche message succès/erreur l'API */}
      <div>{msg}</div>
    </form>
  );
}
