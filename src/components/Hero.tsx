import { useEffect, useState } from 'react';
import { ArrowDown, Play, ChevronRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-corp-900 via-corp-800 to-corp-900" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px] animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-[float_10s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,16,29,0.8)_70%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-light mb-8 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
          </span>
          <span className="text-sm font-medium text-gray-300">{t.hero.badge}</span>
        </div>

        {/* Main Heading */}
        <h1
          className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tight text-white leading-[1.1] mb-6 transition-all duration-1000 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {t.hero.titleLine1}
          <span className="gradient-text">{t.hero.titleHighlight1}</span>
          <br />
          {t.hero.titleLine2}
          <span className="relative inline-block">
            {t.hero.titleHighlight2}
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
              <path d="M1 5.5C50 1 150 1 199 5.5" stroke="url(#underline-gradient)" strokeWidth="3" strokeLinecap="round" />
              <defs>
                <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 font-light leading-relaxed transition-all duration-1000 delay-400 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {t.hero.subtitle}
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16 transition-all duration-1000 delay-[600ms] ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <a
            href="#projects"
            className="group px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white font-semibold rounded-full shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 text-lg"
          >
            {t.hero.cta1}
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </a>
          <a
            href="#about"
            className="group px-8 py-4 glass-light hover:bg-white/10 text-white font-semibold rounded-full transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 text-lg"
          >
            <Play className="w-5 h-5 text-primary-400" />
            {t.hero.cta2}
          </a>
        </div>

        {/* Stats preview */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto transition-all duration-1000 delay-[800ms] ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {t.hero.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.number}</div>
              <div className="text-xs sm:text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a href="#about" className="flex flex-col items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors group">
          <span className="text-xs tracking-widest uppercase">{t.hero.scroll}</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
