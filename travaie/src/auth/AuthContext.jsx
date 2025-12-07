import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api';

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(!!token);

  useEffect(() => {
    let isMounted = true;
    const boot = async () => {
      if (!token) return;
      try {
        const me = await api('/auth/me', { token });
        if (isMounted) setUser(me);
      } catch {
        localStorage.removeItem('token');
        if (isMounted) { setToken(''); setUser(null); }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    boot();
    return () => { isMounted = false; };
  }, [token]);

  const login = (tok, usr) => {
    localStorage.setItem('token', tok);
    setToken(tok);
    setUser(usr);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  };

  const value = { user, token, loading, login, logout, setUser };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}