import { Microscope, HeartPulse, Globe, Leaf, Brain, Users, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { SERVICES } from '../data/constants';
import { useLanguage } from '../i18n/LanguageContext';

const ICON_MAP: Record<string, React.ReactNode> = {
  microscope: <Microscope className="w-7 h-7" />,
  'heart-pulse': <HeartPulse className="w-7 h-7" />,
  globe: <Globe className="w-7 h-7" />,
  leaf: <Leaf className="w-7 h-7" />,
  brain: <Brain className="w-7 h-7" />,
  users: <Users className="w-7 h-7" />,
};

export default function Services() {
  const { ref, isVisible } = useScrollAnimation(0.05);
  const { t } = useLanguage();

  return (
    <section id="services" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-corp-900 via-corp-800/50 to-corp-900" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-[100px]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6">
            <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
            <span className="text-sm font-medium text-primary-400">{t.services.badge}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight mb-6">
            {t.services.titlePart1}<span className="gradient-text">{t.services.titleHighlight}</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">{t.services.description}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl glass hover-lift transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: isVisible ? `${200 + i * 100}ms` : '0ms' }}
            >
              <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${service.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
              <div className="p-8">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))` }}
                >
                  <div className={`bg-gradient-to-br ${service.color} bg-clip-text`}>
                    {ICON_MAP[service.icon]}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                  {t.services.items[i].title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                  {t.services.items[i].description}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-primary-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span>{t.services.learnMore}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                </div>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${service.color} rounded-full blur-[80px] opacity-20`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
