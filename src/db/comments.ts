// Inline IndexedDB for comments
const DB_NAME = 'civicavita_db';
const DB_VERSION = 2;
const COMMENTS_STORE = 'comments';

export interface Comment {
  id: string;
  postId: string;
  authorName: string;
  authorEmail: string;
  content: string;
  createdAt: string;
  approved: boolean;
}

function openCommentsDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(COMMENTS_STORE)) {
        const store = db.createObjectStore(COMMENTS_STORE, { keyPath: 'id' });
        store.createIndex('postId', 'postId', { unique: false });
      }
      // also ensure users store exists (migration safety)
      if (!db.objectStoreNames.contains('users')) {
        const ustore = db.createObjectStore('users', { keyPath: 'id' });
        ustore.createIndex('email', 'email', { unique: true });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export const CommentsDB = {
  async all(): Promise<Comment[]> {
    const db = await openCommentsDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(COMMENTS_STORE, 'readonly');
      const req = tx.objectStore(COMMENTS_STORE).getAll();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  },

  async forPost(postId: string): Promise<Comment[]> {
    const all = await this.all();
    return all
      .filter((c) => c.postId === postId && c.approved)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async create(data: Omit<Comment, 'id' | 'createdAt' | 'approved'>): Promise<Comment> {
    const db = await openCommentsDB();
    const comment: Comment = {
      ...data,
      id: `c_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      approved: false, // require moderation
    };
    return new Promise((resolve, reject) => {
      const tx = db.transaction(COMMENTS_STORE, 'readwrite');
      const req = tx.objectStore(COMMENTS_STORE).add(comment);
      req.onsuccess = () => resolve(comment);
      req.onerror = () => reject(req.error);
    });
  },

  async approve(id: string): Promise<void> {
    const db = await openCommentsDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(COMMENTS_STORE, 'readwrite');
      const store = tx.objectStore(COMMENTS_STORE);
      const getReq = store.get(id);
      getReq.onsuccess = () => {
        const c = getReq.result;
        if (c) {
          c.approved = true;
          store.put(c);
        }
        resolve();
      };
      getReq.onerror = () => reject(getReq.error);
    });
  },

  async delete(id: string): Promise<void> {
    const db = await openCommentsDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(COMMENTS_STORE, 'readwrite');
      const req = tx.objectStore(COMMENTS_STORE).delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  },
};
