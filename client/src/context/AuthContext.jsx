import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as authApi from '../api/auth.js';
import { tokenStore } from '../api/client.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on load if a token exists.
  useEffect(() => {
    let active = true;
    (async () => {
      if (!tokenStore.access && !tokenStore.refresh) {
        setLoading(false);
        return;
      }
      try {
        const me = await authApi.fetchMe();
        if (active) setUser(me);
      } catch {
        tokenStore.clear();
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (payload) => {
    const u = await authApi.login(payload);
    setUser(u);
    return u;
  }, []);

  const register = useCallback(async (payload) => {
    const u = await authApi.register(payload);
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout();
    setUser(null);
  }, []);

  const value = { user, loading, login, register, logout, isAdmin: user?.role === 'admin' };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
