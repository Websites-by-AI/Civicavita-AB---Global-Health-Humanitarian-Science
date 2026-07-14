import { ExternalLink, Calendar, Activity } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { PROJECTS } from '../data/constants';
import { useLanguage } from '../i18n/LanguageContext';

const statusColorMap: Record<string, string> = {
  Active: 'bg-green-500/20 text-green-400 border-green-500/30',
  'In Development': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Ongoing: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Planning: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
};

export default function Projects() {
  const { ref, isVisible } = useScrollAnimation(0.05);
  const { t } = useLanguage();

  return (
    <section id="projects" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-corp-900" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6">
            <Activity className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-400">{t.projects.badge}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight mb-6">
            {t.projects.titlePart1}<span className="gradient-text">{t.projects.titleHighlight}</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">{t.projects.description}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, i) => {
            const translatedStatus = t.projects.statuses[project.status as keyof typeof t.projects.statuses] || project.status;
            return (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl glass hover-lift flex flex-col transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: isVisible ? `${200 + i * 100}ms` : '0ms' }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={project.image} alt={t.projects.items[i].title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-corp-900 via-corp-900/30 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusColorMap[project.status] || 'bg-gray-500/20 text-gray-400'}`}>
                      {translatedStatus}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs text-gray-300">
                    <Calendar className="w-3.5 h-3.5" />
                    {project.year}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary-400 transition-colors leading-snug">
                    {t.projects.items[i].title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-5 flex-1">
                    {t.projects.items[i].description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {t.projects.items[i].tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="flex items-center gap-2 text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors group/link">
                    <span>{t.projects.viewDetails}</span>
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
