// Lightweight IndexedDB wrapper — a real browser database for users & sessions.
// Can later be swapped for Firebase / Supabase / a REST API by reimplementing
// the same async surface.

const DB_NAME = 'civicavita_db';
const DB_VERSION = 1;
const USER_STORE = 'users';

export interface DBUser {
  id: string;
  name: string;
  email: string;
  password: string; // NOTE: plaintext for demo only — never do this in production
  role: 'admin' | 'editor' | 'viewer';
  isDemo?: boolean;
  createdAt: string;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(USER_STORE)) {
        const store = db.createObjectStore(USER_STORE, { keyPath: 'id' });
        store.createIndex('email', 'email', { unique: true });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function tx<T>(
  store: string,
  mode: IDBTransactionMode,
  fn: (s: IDBObjectStore) => IDBRequest<T> | Promise<T>
): Promise<T> {
  return openDB().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const transaction = db.transaction(store, mode);
        const objectStore = transaction.objectStore(store);
        const result = fn(objectStore);
        if (result instanceof IDBRequest) {
          result.onsuccess = () => resolve(result.result as T);
          result.onerror = () => reject(result.error);
        } else {
          Promise.resolve(result).then(resolve, reject);
        }
      })
  );
}

export const UsersDB = {
  async list(): Promise<DBUser[]> {
    return tx<DBUser[]>(USER_STORE, 'readonly', (s) => s.getAll());
  },

  async findByEmail(email: string): Promise<DBUser | undefined> {
    const all = await this.list();
    return all.find((u) => u.email.toLowerCase() === email.toLowerCase());
  },

  async create(user: Omit<DBUser, 'id' | 'createdAt'>): Promise<DBUser> {
    const existing = await this.findByEmail(user.email);
    if (existing) throw new Error('EMAIL_TAKEN');
    const full: DBUser = {
      ...user,
      id: `u_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
    };
    await tx(USER_STORE, 'readwrite', (s) => s.add(full));
    return full;
  },

  async delete(id: string): Promise<void> {
    await tx(USER_STORE, 'readwrite', (s) => s.delete(id));
  },
};

// Migrate any legacy localStorage users into IndexedDB on first run
export async function migrateLegacyUsers(): Promise<void> {
  const LEGACY_KEY = 'civicavita_users';
  const raw = localStorage.getItem(LEGACY_KEY);
  if (!raw) return;
  try {
    const legacy = JSON.parse(raw) as Array<{ name: string; email: string; password: string }>;
    for (const u of legacy) {
      const exists = await UsersDB.findByEmail(u.email);
      if (!exists) {
        await UsersDB.create({ name: u.name, email: u.email, password: u.password, role: 'admin' });
      }
    }
    localStorage.removeItem(LEGACY_KEY);
  } catch {
    /* ignore */
  }
}
