import { ArrowRight, Heart, Shield, Zap } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../i18n/LanguageContext';

const ICONS = [
  <Shield className="w-4 h-4" />,
  <Heart className="w-4 h-4" />,
  <Zap className="w-4 h-4" />,
];

export default function CTABanner() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { t } = useLanguage();

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-corp-800 to-corp-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.1),transparent_60%)]" />

      <div className="absolute top-10 left-10 w-20 h-20 border border-primary-500/20 rounded-full animate-[float_6s_ease-in-out_infinite]" />
      <div className="absolute bottom-10 right-20 w-12 h-12 border border-blue-500/20 rounded-full animate-[float_8s_ease-in-out_infinite_reverse]" />
      <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-primary-500/30 rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-500/30 rounded-full animate-pulse delay-500" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            {t.cta.features.map((text, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-primary-400">{ICONS[i]}</span>
                {text}
              </div>
            ))}
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight mb-6">
            {t.cta.titlePart1}<span className="gradient-text">{t.cta.titleHighlight}</span>?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light">
            {t.cta.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="group px-8 py-4 bg-white text-corp-900 font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 text-lg">
              {t.cta.cta1}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
            </a>
            <a href="#projects" className="px-8 py-4 glass-light hover:bg-white/10 text-white font-semibold rounded-full transition-all duration-300 hover:-translate-y-1 text-lg border border-white/20">
              {t.cta.cta2}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
