import { useLanguage } from '../i18n/LanguageContext';
import { publicContent } from '../data/publicContent';

export default function About() {
  const { lang } = useLanguage();
  const c = publicContent[lang];
  return <section id="about" className="relative py-24 sm:py-32 overflow-hidden bg-corp-800/40">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(16,185,129,.08),transparent_28%)]" />
    <div className="relative max-w-5xl mx-auto px-5 sm:px-8 text-center">
      <p className="text-primary-400 text-sm font-bold tracking-widest uppercase">CIVICAVITA AB</p>
      <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white">{c.aboutTitle}</h2>
      <p className="mt-8 text-lg sm:text-xl leading-9 text-gray-300 max-w-4xl mx-auto">{c.about}</p>
    </div>
  </section>;
}
