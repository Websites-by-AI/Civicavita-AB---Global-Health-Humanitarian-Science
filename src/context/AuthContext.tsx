import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { UsersDB, type DBUser, migrateLegacyUsers } from '../db/users';

export const DEMO_ADMIN_EMAIL = 'demo@civicavita.se';
export const DEMO_ADMIN_PASSWORD = 'civicavita2026';

interface AuthContextType {
  user: DBUser | null;
  isAuthed: boolean;
  isDemo: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  loginAsDemo: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const SESSION_KEY = 'civicavita_session_v2';

function readSession(): { userId?: string; isDemo?: boolean; name?: string } | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSession(data: { userId?: string; isDemo?: boolean; name?: string } | null) {
  if (data) sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  else sessionStorage.removeItem(SESSION_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DBUser | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await migrateLegacyUsers();
      const session = readSession();
      if (session?.isDemo) {
        setIsDemo(true);
        setUser({
          id: 'demo',
          name: session.name || 'Demo Admin',
          email: DEMO_ADMIN_EMAIL,
          password: '',
          role: 'admin',
          createdAt: new Date().toISOString(),
        });
      } else if (session?.userId) {
        const users = await UsersDB.list();
        const found = users.find((u) => u.id === session.userId);
        if (found) setUser(found);
      }
      setIsLoading(false);
    })();
  }, []);

  const login = async (email: string, password: string) => {
    if (!email || !password) return { ok: false, error: 'EMPTY' };
    // Demo admin
    if (email.toLowerCase() === DEMO_ADMIN_EMAIL.toLowerCase() && password === DEMO_ADMIN_PASSWORD) {
      setIsDemo(true);
      const demoUser: DBUser = {
        id: 'demo', name: 'Demo Admin', email: DEMO_ADMIN_EMAIL, password: '', role: 'admin', createdAt: new Date().toISOString(),
      };
      setUser(demoUser);
      writeSession({ isDemo: true, name: 'Demo Admin' });
      return { ok: true };
    }
    // Registered user
    const found = await UsersDB.findByEmail(email);
    if (!found || found.password !== password) return { ok: false, error: 'INVALID' };
    setUser(found);
    setIsDemo(false);
    writeSession({ userId: found.id, name: found.name });
    return { ok: true };
  };

  const loginAsDemo = async () => {
    await login(DEMO_ADMIN_EMAIL, DEMO_ADMIN_PASSWORD);
  };

  const register = async (name: string, email: string, password: string) => {
    if (!name.trim() || !email.trim() || password.length < 6) return { ok: false, error: 'INVALID' };
    try {
      const created = await UsersDB.create({ name: name.trim(), email: email.trim(), password, role: 'admin' });
      setUser(created);
      setIsDemo(false);
      writeSession({ userId: created.id, name: created.name });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: (e as Error).message === 'EMAIL_TAKEN' ? 'EMAIL_TAKEN' : 'UNKNOWN' };
    }
  };

  const logout = () => {
    setUser(null);
    setIsDemo(false);
    writeSession(null);
    // Also clear legacy admin session if present
    sessionStorage.removeItem('civicavita_admin_auth');
    sessionStorage.removeItem('civicavita_admin_auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthed: !!user, isDemo, isLoading, login, loginAsDemo, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
