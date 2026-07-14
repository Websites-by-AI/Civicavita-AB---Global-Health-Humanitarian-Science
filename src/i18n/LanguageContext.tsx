import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import en, { type Translations } from './en';
import fr from './fr';
import ar from './ar';
import sv from './sv';
import fa from './fa';

export type LangCode = 'en' | 'fr' | 'ar' | 'sv' | 'fa';

export const LANGUAGES: { code: LangCode; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
];

const translations: Record<LangCode, Translations> = { en, fr, ar, sv, fa };

interface LanguageContextType {
  lang: LangCode;
  t: Translations;
  setLang: (lang: LangCode) => void;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  t: en,
  setLang: () => {},
  dir: 'ltr',
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(() => {
    const stored = localStorage.getItem('civicavita-lang') as LangCode | null;
    return stored && translations[stored] ? stored : 'en';
  });

  const t = translations[lang];
  const dir = t.dir as 'ltr' | 'rtl';

  const setLang = (code: LangCode) => {
    setLangState(code);
    localStorage.setItem('civicavita-lang', code);
  };

  useEffect(() => {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
  }, [lang, dir]);

  return (
    <LanguageContext.Provider value={{ lang, t, setLang, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
