import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api, getAuthToken, setAuthToken } from "@/lib/api/client";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; password_confirmation: string; role?: string }) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getAuthToken();
    if (stored) {
      setTokenState(stored);
      api.get<{ data: User }>("/me")
        .then((res) => setUser(res.data))
        .catch(() => {
          setAuthToken(null);
          setTokenState(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post<{ data: User; token: string }>("/login", { email, password });
    setAuthToken(res.token);
    setTokenState(res.token);
    setUser(res.data);
  };

  const register = async (data: { name: string; email: string; password: string; password_confirmation: string; role?: string }) => {
    const res = await api.post<{ data: User; token: string }>("/register", data);
    setAuthToken(res.token);
    setTokenState(res.token);
    setUser(res.data);
  };

  const logout = async () => {
    try {
      await api.post("/logout", {});
    } catch {}
    setAuthToken(null);
    setTokenState(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}