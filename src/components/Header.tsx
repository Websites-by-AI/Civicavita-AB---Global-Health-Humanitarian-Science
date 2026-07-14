import { useState, useEffect, useRef } from 'react';
import { Menu, X, Globe2, ChevronDown } from 'lucide-react';
import { useLanguage, LANGUAGES } from '../i18n/LanguageContext';
import { useRouter } from '../context/RouterContext';

type NavKey = 'home' | 'about' | 'services' | 'projects' | 'impact' | 'team' | 'blog' | 'contact';
const NAV_KEYS: NavKey[] = ['home', 'about', 'services', 'projects', 'impact', 'team', 'blog', 'contact'];
const SCROLL_KEYS: NavKey[] = ['home', 'about', 'services', 'projects', 'impact', 'team', 'contact'];

export default function Header() {
  const { t, lang, setLang, dir } = useLanguage();
  const { route, navigate } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const navLinks = NAV_KEYS.map((key) => ({
    key,
    label: t.nav[key as keyof typeof t.nav],
    href: `#${key}`,
  }));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (route.name !== 'home') return;
      for (let i = SCROLL_KEYS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SCROLL_KEYS[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(SCROLL_KEYS[i]);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [route.name]);

  useEffect(() => {
    if (route.name === 'blog' || route.name === 'post') setActiveSection('blog');
    else if (route.name === 'admin') setActiveSection('');
    else setActiveSection('home');
  }, [route.name]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setIsLangOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleNavClick = (key: NavKey) => {
    setIsMobileMenuOpen(false);
    if (key === 'blog') {
      navigate({ name: 'blog' });
      return;
    }
    if (key === 'home') {
      navigate({ name: 'home' });
      return;
    }
    // For scroll sections: ensure we're on home, then scroll
    if (route.name !== 'home') {
      navigate({ name: 'home' });
      setTimeout(() => {
        const el = document.getElementById(key);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(key);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentLang = LANGUAGES.find((l) => l.code === lang)!;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || route.name !== 'home' ? 'bg-corp-900/90 backdrop-blur-xl shadow-2xl shadow-black/20 border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button onClick={() => navigate({ name: 'home' })} className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-shadow">
                <Globe2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white tracking-tight leading-none">
                  Civicavita<span className="text-primary-400">.AB</span>
                </span>
                <span className="text-[10px] text-gray-400 tracking-widest uppercase font-medium">Global Health</span>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.key;
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.key)}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-lg ${isActive ? 'text-primary-400' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
                  >
                    {link.label}
                    {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-400" />}
                  </button>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div ref={langRef} className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg glass-light hover:bg-white/10 text-gray-300 hover:text-white transition-all text-sm"
                  aria-label="Change language"
                >
                  <span className="text-base">{currentLang.flag}</span>
                  <span className="hidden sm:inline text-xs font-medium">{currentLang.name}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>
                {isLangOpen && (
                  <div className={`absolute top-full mt-2 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-44 rounded-xl glass border border-white/10 shadow-2xl shadow-black/40 overflow-hidden z-60`}>
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setIsLangOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${lang === l.code ? 'bg-primary-500/15 text-primary-400 font-semibold' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                      >
                        <span className="text-lg">{l.flag}</span>
                        <span>{l.name}</span>
                        {lang === l.code && <span className="ms-auto w-1.5 h-1.5 rounded-full bg-primary-400" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNavClick('contact')}
                className="hidden sm:inline-flex px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white text-sm font-semibold rounded-full shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all hover:-translate-y-0.5"
              >
                {t.nav.getInvolved}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`absolute ${dir === 'rtl' ? 'left-0' : 'right-0'} top-0 h-full w-80 max-w-[85vw] bg-corp-800 shadow-2xl transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : dir === 'rtl' ? '-translate-x-full' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <span className="text-lg font-bold text-white">{t.nav.menu}</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-6 pt-6 pb-2">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-medium">
              {dir === 'rtl' ? 'اللغة' : 'Language'}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${lang === l.code ? 'bg-primary-500/15 text-primary-400 font-semibold border border-primary-500/30' : 'text-gray-300 glass-light hover:bg-white/10'}`}
                >
                  <span>{l.flag}</span>
                  <span className="truncate">{l.name}</span>
                </button>
              ))}
            </div>
          </div>

          <nav className="p-6 pt-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.key)}
                className={`w-full text-start px-4 py-3 rounded-lg text-base font-medium transition-colors ${activeSection === link.key ? 'text-primary-400 bg-primary-500/10' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full px-5 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg"
              >
                {t.nav.getInvolved}
              </button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
