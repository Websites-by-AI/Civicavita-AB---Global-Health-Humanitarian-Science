import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { type BlogPost, SEED_POSTS } from '../data/posts';
import { useLanguage } from '../i18n/LanguageContext';

interface PostsContextType {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id'>) => Promise<string>;
  updatePost: (id: string, post: Omit<BlogPost, 'id'>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  getPost: (id: string) => BlogPost | undefined;
  resetPosts: () => Promise<void>;
  databaseError: string | null;
}
const PostsContext = createContext<PostsContextType | null>(null);
async function request(path: string, init?: RequestInit) {
  const response = await fetch(path, { credentials: 'same-origin', headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) }, ...init });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Database request failed');
  return data;
}
export function PostsProvider({ children }: { children: ReactNode }) {
  const { lang } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [databaseError, setDatabaseError] = useState<string | null>(null);
  const load = async () => {
    try { const data = await request(`/api/posts?locale=${encodeURIComponent(lang)}`); setPosts(data.posts); setDatabaseError(null); }
    catch (error) { setPosts(lang === 'en' ? SEED_POSTS : []); setDatabaseError(error instanceof Error ? error.message : 'Database unavailable'); }
  };
  useEffect(() => { void load(); }, [lang]);
  const addPost = async (post: Omit<BlogPost, 'id'>) => { const data = await request('/api/posts', { method: 'POST', body: JSON.stringify(post) }); setPosts((prev) => [data.post, ...prev]); return data.post.id; };
  const updatePost = async (id: string, post: Omit<BlogPost, 'id'>) => { const data = await request(`/api/posts/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(post) }); setPosts((prev) => prev.map((p) => p.id === id ? data.post : p)); };
  const deletePost = async (id: string) => { await request(`/api/posts/${encodeURIComponent(id)}`, { method: 'DELETE' }); setPosts((prev) => prev.filter((p) => p.id !== id)); };
  const resetPosts = async () => { await load(); };
  return <PostsContext.Provider value={{ posts, addPost, updatePost, deletePost, getPost: (id) => posts.find((p) => p.id === id), resetPosts, databaseError }}>{children}</PostsContext.Provider>;
}
export function usePosts() { const ctx = useContext(PostsContext); if (!ctx) throw new Error('usePosts must be used within PostsProvider'); return ctx; }
