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
}