import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'shop-app-user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  // Mock: любой email + пароль длиной от 6 символов
  const login = (email, password) => {
    if (!email || !password) {
      return { ok: false, error: 'Заполните все поля' };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { ok: false, error: 'Некорректный email' };
    }
    if (password.length < 6) {
      return { ok: false, error: 'Пароль должен быть не короче 6 символов' };
    }
    const name = email.split('@')[0];
    setUser({ email, name });
    return { ok: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}