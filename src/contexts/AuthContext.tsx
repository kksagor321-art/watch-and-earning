import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  coins: number;
  totalEarnings: number;
  completedTasks: string[];
  joinDate: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  addCoins: (amount: number) => void;
  completeTask: (taskId: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("adearnings_user");
    return saved ? JSON.parse(saved) : null;
  });

  const persist = (u: User) => {
    setUser(u);
    localStorage.setItem("adearnings_user", JSON.stringify(u));
  };

  const signup = (name: string, email: string, _password: string) => {
    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      coins: 50,
      totalEarnings: 0,
      completedTasks: [],
      joinDate: new Date().toISOString(),
    };
    persist(newUser);
    return true;
  };

  const login = (email: string, _password: string) => {
    const saved = localStorage.getItem("adearnings_user");
    if (saved) {
      const u = JSON.parse(saved);
      if (u.email === email) { setUser(u); return true; }
    }
    // Demo: auto-create
    return signup("Demo User", email, _password);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("adearnings_user");
  };

  const addCoins = (amount: number) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, coins: prev.coins + amount, totalEarnings: prev.totalEarnings + amount };
      localStorage.setItem("adearnings_user", JSON.stringify(updated));
      return updated;
    });
  };

  const completeTask = (taskId: string) => {
    setUser(prev => {
      if (!prev || prev.completedTasks.includes(taskId)) return prev;
      const updated = { ...prev, completedTasks: [...prev.completedTasks, taskId] };
      localStorage.setItem("adearnings_user", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, addCoins, completeTask }}>
      {children}
    </AuthContext.Provider>
  );
};
