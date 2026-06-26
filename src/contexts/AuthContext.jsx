// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';
import * as authApi from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('authUser')); }
    catch { return null; }
  });
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const res = await authApi.login({ email, password });
      localStorage.setItem('authToken', res.token);
      localStorage.setItem('authUser', JSON.stringify(res.user));
      setUser(res.user);
      return res.user;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data) => {
    setLoading(true);
    try {
      const res = await authApi.register(data);
      localStorage.setItem('authToken', res.token);
      localStorage.setItem('authUser', JSON.stringify(res.user));
      setUser(res.user);
      return res.user;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setUser(null);
  }, []);

  const updateUser = useCallback(async (data) => {
    const res = await authApi.updateMe(data);
    localStorage.setItem('authUser', JSON.stringify(res.user));
    setUser(res.user);
    return res.user;
  }, []);

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
