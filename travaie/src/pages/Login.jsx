import { useState } from 'react';
import { api } from '../api';

export default function Login() {
  const [form, setForm] = useState({ email:'', password:'' });
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { user, token } = await api('/auth/login', { method:'POST', body: form });
      localStorage.setItem('token', token);
      setMsg(`Connecté: ${user.nom}`);
    } catch (e) { setMsg(e.message); }
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
      <input placeholder="Mot de passe" type="password" value={form.password}
             onChange={e=>setForm({...form, password:e.target.value})}/>
      <button type="submit">Se connecter</button>
      <div>{msg}</div>
    </form>
  );
}