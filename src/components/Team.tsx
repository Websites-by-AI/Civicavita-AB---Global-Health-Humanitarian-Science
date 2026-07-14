import { Mail, UserPlus, Users, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { FOUNDER } from '../data/constants';
import { useLanguage } from '../i18n/LanguageContext';

export default function Team() {
  const { ref, isVisible } = useScrollAnimation(0.05);
  const { t } = useLanguage();

  // Three placeholder slots for future team members
  const placeholders = [0, 1, 2];

  return (
    <section id="team" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-corp-900" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[120px]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6">
            <Users className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-400">{t.team.badge}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight mb-6">
            {t.team.titlePart1}<span className="gradient-text">{t.team.titleHighlight}</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">{t.team.description}</p>
        </div>

        {/* Grid: Sahar + 3 empty slots */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sahar — Founder card */}
          <div
            className={`group relative overflow-hidden rounded-2xl glass hover-lift text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-primary-600" />
            <div className="relative pt-8 px-8">
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 opacity-30 blur-lg" />
                <img
                  src={FOUNDER.image}
                  alt={FOUNDER.name}
                  className="relative w-32 h-32 rounded-full object-cover ring-4 ring-primary-500/50 shadow-xl"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="p-6 pt-5">
              <h3 className="text-lg font-bold text-white mb-1">{FOUNDER.name}</h3>
              <p className="text-sm text-primary-400 font-medium mb-3">{t.founder.role}</p>
              <p className="text-sm text-gray-400 leading-relaxed mb-5 line-clamp-3">
                {t.founder.bio}
              </p>
              <div className="flex items-center justify-center gap-3">
                <a href={FOUNDER.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all" aria-label="LinkedIn">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
                <a href="mailto:info@civicavita.se" className="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all" aria-label="Email">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Empty placeholder slots */}
          {placeholders.map((i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl border-2 border-dashed border-white/10 hover:border-primary-500/30 bg-white/[0.02] hover:bg-primary-500/[0.03] text-center transition-all duration-700 flex flex-col items-center justify-center p-8 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: isVisible ? `${200 + (i + 1) * 150}ms` : '0ms' }}
            >
              <div className="w-28 h-28 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center mb-5 bg-white/[0.02]">
                <UserPlus className="w-10 h-10 text-gray-600 group-hover:text-primary-400 transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{t.team.openPosition}</h3>
              <p className="text-sm text-gray-500 mb-5 leading-relaxed">{t.team.openPositionText}</p>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full glass-light hover:bg-primary-500/10 text-primary-400 hover:text-primary-300 transition-all"
              >
                <Sparkles className="w-3 h-3" />
                {t.team.applyNow}
              </a>
            </div>
          ))}
        </div>

        {/* Join CTA */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block rounded-2xl glass p-8 sm:p-10 max-w-2xl">
            <h3 className="text-2xl font-bold text-white mb-3">{t.team.joinTitle}</h3>
            <p className="text-gray-400 mb-6">{t.team.joinText}</p>
            <a href="#contact" className="inline-flex px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white font-semibold rounded-full shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all hover:-translate-y-0.5">
              {t.team.joinCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
