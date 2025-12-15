import { useState } from 'react';
import { api } from '../api';
import {useNavigate} from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email:'', password:'' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { user, token } = await api('/auth/login', { method:'POST', body: form });
      localStorage.setItem('token', token);
      setMsg(`Connecté: ${user.nom}`);
      navigate('/');
    } catch (e) { setMsg(e.message); }
  };

  return (
    <form onSubmit={submit}>
      <div className='inputtext'><input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/></div>
      <div className='inputtext'><input placeholder="Mot de passe" type="password" value={form.password}
             onChange={e=>setForm({...form, password:e.target.value})}/></div>
      <div className='btn'><button type="submit">Se connecter</button></div>
      <div>{msg}</div>
    </form>
  );
}