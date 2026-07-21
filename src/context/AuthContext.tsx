import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export const DEMO_ADMIN_EMAIL = '';
export const DEMO_ADMIN_PASSWORD = '';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'member';
  createdAt?: string;
}
interface AuthContextType {
  user: AuthUser | null;
  isAuthed: boolean;
  isDemo: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  loginAsDemo: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | null>(null);

async function api(path: string, init: RequestInit = {}) {
  const response = await fetch(path, { credentials: 'same-origin', headers: { 'Content-Type': 'application/json', ...(init.headers || {}) }, ...init });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { api('/api/auth/me').then((d) => setUser(d.user)).catch(() => setUser(null)).finally(() => setIsLoading(false)); }, []);
  const login = async (email: string, password: string) => {
    try { const data = await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }); setUser(data.user); return { ok: true }; }
    catch (error) { return { ok: false, error: error instanceof Error ? error.message : 'INVALID' }; }
  };
  const logout = async () => { try { await api('/api/auth/logout', { method: 'POST' }); } finally { setUser(null); } };
  const register = async () => ({ ok: false, error: 'REGISTRATION_DISABLED' });
  const loginAsDemo = async () => undefined;
  return <AuthContext.Provider value={{ user, isAuthed: !!user, isDemo: false, isLoading, login, loginAsDemo, register, logout }}>{children}</AuthContext.Provider>;
}
export function useAuth() { const ctx = useContext(AuthContext); if (!ctx) throw new Error('useAuth must be used within AuthProvider'); return ctx; }
