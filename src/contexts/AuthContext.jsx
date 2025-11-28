import React, { createContext, useState, useContext } from 'react';
import { users } from '../data/dummy';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = ({ email, password }) => {
    const u = users.find(
      x => x.email === email && x.password === password
    );

    if (!u) {
      return { ok: false, message: 'Email atau password salah' };
    }

    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));

    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem("user");

    try {
      const all = JSON.parse(localStorage.getItem("results") || "[]");

      if (user) {
        const remaining = all.filter(r => r.userEmail !== user.email);
        localStorage.setItem("results", JSON.stringify(remaining));
      }
    } catch {
      localStorage.removeItem("results");
    }

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
