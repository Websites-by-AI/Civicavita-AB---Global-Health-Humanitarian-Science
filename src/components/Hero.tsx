import { useEffect, useState } from 'react';
import { ArrowDown, ChevronRight, Play } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { publicContent } from '../data/publicContent';
import { uiLocal } from '../data/uiLocal';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const { lang } = useLanguage();
  const copy = publicContent[lang]; const ui = uiLocal[lang];
  useEffect(() => { const id = window.setTimeout(() => setLoaded(true), 100); return () => clearTimeout(id); }, []);
  return <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-corp-900 via-corp-800 to-corp-900" />
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px]" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage:'linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)', backgroundSize:'60px 60px' }} />
    <div className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center pt-20 transition-all duration-1000 ${loaded?'opacity-100 translate-y-0':'opacity-0 translate-y-6'}`}>
      <p className="inline-flex px-5 py-2.5 rounded-full glass-light mb-8 text-sm text-gray-300 font-medium tracking-wide">{copy.eyebrow}</p>
      <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tight text-white leading-[1.1]">
        <span className="block">{ui.hero[0]} </span>
        <span className="block bg-gradient-to-r from-primary-300 via-orange-400 to-orange-500 bg-clip-text text-transparent">{ui.hero[1]}</span>
        <span className="block bg-gradient-to-r from-primary-300 to-emerald-500 bg-clip-text text-transparent">{ui.hero[2]}</span>
      </h1>
      <p className="mt-8 text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">{copy.lead}</p>
      <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
        <a href="#insights" className="group px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white font-semibold rounded-full shadow-xl shadow-primary-500/25 transition-all flex gap-2 items-center text-lg">{copy.primary}<ChevronRight className="w-5 h-5 group-hover:translate-x-1 rtl:rotate-180" /></a>
        <a href="#about" className="group px-8 py-4 glass-light hover:bg-white/10 text-white font-semibold rounded-full flex gap-2 items-center text-lg"><Play className="w-5 h-5 text-orange-400"/>{copy.secondary}</a>
      </div>
    </div>
    <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-primary-400 flex flex-col items-center gap-2"><span className="text-xs tracking-widest uppercase">{ui.scroll}</span><ArrowDown className="w-5 h-5 animate-bounce" /></a>
  </section>
}
