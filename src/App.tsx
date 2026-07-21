import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import BlogPreview from './components/BlogPreview';
import CTABanner from './components/CTABanner';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import AdminPanel from './components/AdminPanel';
import AITools from './components/AITools';
import UserAccount from './components/UserAccount';
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { PostsProvider } from './context/PostsContext';
import { AuthProvider } from './context/AuthContext';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggle = () => setIsVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-xl shadow-primary-500/25 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-primary-500/40 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <BlogPreview />
      <CTABanner />
      <Contact />
    </>
  );
}

function AppContent() {
  const { dir } = useLanguage();
  const { route } = useRouter();

  return (
    <div className="min-h-screen bg-corp-900 text-white font-sans antialiased" dir={dir}>
      <Header />
      <main>
        {route.name === 'home' && <HomePage />}
        {route.name === 'blog' && <Blog />}
        {route.name === 'post' && <BlogPost />}
        {route.name === 'admin' && <AdminPanel />}
        {route.name === 'ai' && <AITools />}
        {route.name === 'account' && <UserAccount />}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <RouterProvider>
          <PostsProvider>
            <AppContent />
          </PostsProvider>
        </RouterProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
