import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  // useEffect(() => {
  //   const savedToken = localStorage.getItem("craftly-token");
  //   const savedUser  = localStorage.getItem("craftly-user");
  //   if (savedToken && savedUser) {
  //     setToken(savedToken);
  //     setUser(JSON.parse(savedUser));
  //   }
  //   setIsLoading(false);
  // }, []);


  // Check token expiry on load
useEffect(() => {
  const savedToken = localStorage.getItem("craftly-token");
  const savedUser  = localStorage.getItem("craftly-user");
  if (savedToken && savedUser) {
    // Decode JWT and check expiry
    try {
      const payload = JSON.parse(atob(savedToken.split(".")[1]));
      if (payload.exp * 1000 < Date.now()) {
        // Token expired — clear session
        localStorage.removeItem("craftly-token");
        localStorage.removeItem("craftly-user");
      } else {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch {
      localStorage.removeItem("craftly-token");
      localStorage.removeItem("craftly-user");
    }
  }
  setIsLoading(false);
}, []);

  const saveSession = (userData: User, jwtToken: string) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("craftly-token", jwtToken);
    localStorage.setItem("craftly-user", JSON.stringify(userData));
  };

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    saveSession(data.user, data.token);
    toast.success(`Welcome back, ${data.user.name}!`);
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");
    saveSession(data.user, data.token);
    toast.success(`Welcome to CraftWorld, ${data.user.name}!`);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("craftly-token");
    localStorage.removeItem("craftly-user");
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn: !!user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};