import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { type BlogPost, loadPosts, savePosts, generateId } from '../data/posts';

interface PostsContextType {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id'>) => string;
  updatePost: (id: string, post: Omit<BlogPost, 'id'>) => void;
  deletePost: (id: string) => void;
  getPost: (id: string) => BlogPost | undefined;
  resetPosts: () => void;
}

const PostsContext = createContext<PostsContextType | null>(null);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(loadPosts());
  }, []);

  useEffect(() => {
    if (posts.length > 0) savePosts(posts);
  }, [posts]);

  const addPost = (post: Omit<BlogPost, 'id'>): string => {
    const id = generateId();
    setPosts((prev) => [{ ...post, id }, ...prev]);
    return id;
  };

  const updatePost = (id: string, post: Omit<BlogPost, 'id'>) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...post, id } : p)));
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const getPost = (id: string) => posts.find((p) => p.id === id);

  const resetPosts = () => {
    localStorage.removeItem('civicavita_posts_v1');
    setPosts(loadPosts());
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, updatePost, deletePost, getPost, resetPosts }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error('usePosts must be used within PostsProvider');
  return ctx;
}
