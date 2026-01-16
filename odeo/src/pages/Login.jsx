import { useState } from 'react';
import { api } from '../api';
import {useNavigate} from 'react-router-dom';
import '../Logreg.css';

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
    <form onSubmit={submit}><div className='boxall'>
      <div><input className='inputtext' placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/></div>
      <div><input className='inputtext' placeholder="Mot de passe" type="password" value={form.password}
             onChange={e=>setForm({...form, password:e.target.value})}/></div>
      <div><button className='btn' type="submit">Se connecter</button></div></div>
      <div>{msg}</div>
    </form>
  );
}