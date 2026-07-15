import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'blog' }
  | { name: 'post'; id: string }
  | { name: 'admin' }
  | { name: 'ai' }
  | { name: 'account' };

interface RouterContextType {
  route: Route;
  navigate: (route: Route) => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

function parseHash(hash: string): Route {
  const h = hash.replace(/^#\/?/, '');
  if (!h || h === '/') return { name: 'home' };
  if (h === 'blog') return { name: 'blog' };
  if (h.startsWith('blog/')) return { name: 'post', id: h.slice(5) };
  if (h === 'admin') return { name: 'admin' };
  if (h === 'ai') return { name: 'ai' };
  if (h === 'account') return { name: 'account' };
  return { name: 'home' };
}

function routeToHash(route: Route): string {
  switch (route.name) {
    case 'home':
      return '#/';
    case 'blog':
      return '#/blog';
    case 'post':
      return `#/blog/${route.id}`;
    case 'admin':
      return '#/admin';
    case 'ai':
      return '#/ai';
    case 'account':
      return '#/account';
  }
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (r: Route) => {
    window.location.hash = routeToHash(r);
  };

  return <RouterContext.Provider value={{ route, navigate }}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}
