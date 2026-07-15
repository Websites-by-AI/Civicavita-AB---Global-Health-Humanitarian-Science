import { Target, Eye, Sparkles, GraduationCap, Briefcase, MapPin, Award, ExternalLink, BookOpen, Languages as LanguagesIcon, Wrench, FileText, Building2 } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../i18n/LanguageContext';
import { FOUNDER, FOUNDER_EXPERIENCE, FOUNDER_EDUCATION, FOUNDER_COURSES, FOUNDER_PUBLICATIONS } from '../data/constants';

export default function About() {
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.05);
  const { ref: founderRef, isVisible: founderVisible } = useScrollAnimation(0.1);
  const { ref: missionRef, isVisible: missionVisible } = useScrollAnimation(0.1);
  const { ref: experienceRef, isVisible: experienceVisible } = useScrollAnimation(0.05);
  const { ref: eduRef, isVisible: eduVisible } = useScrollAnimation(0.05);
  const { ref: coursesRef, isVisible: coursesVisible } = useScrollAnimation(0.05);
  const { ref: pubRef, isVisible: pubVisible } = useScrollAnimation(0.05);
  const { ref: langRef, isVisible: langVisible } = useScrollAnimation(0.05);
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation(0.1);
  const { t } = useLanguage();

  const HIGHLIGHT_ICONS = [
    <GraduationCap className="w-4 h-4 text-primary-400" />,
    <Briefcase className="w-4 h-4 text-primary-400" />,
    <MapPin className="w-4 h-4 text-primary-400" />,
    <Award className="w-4 h-4 text-primary-400" />,
  ];

  const levelKeys: Array<'native' | 'fluent' | 'working'> = ['native', 'fluent', 'working'];

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-corp-900" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ─── Header ─── */}
        <div
          ref={sectionRef}
          className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-400">{t.about.badge}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight mb-6">
            {t.about.titlePart1}<span className="gradient-text">{t.about.titleHighlight}</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t.about.description}
          </p>
        </div>

        {/* ─── Founder Profile ─── */}
        <div
          ref={founderRef}
          className={`max-w-5xl mx-auto mb-24 transition-all duration-1000 ${founderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="relative rounded-3xl glass overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 via-blue-500 to-violet-500" />
            <div className="p-8 sm:p-12 lg:p-14">
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center lg:items-start">
                <div className="flex-shrink-0">
                  <div className="relative group">
                    <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-primary-400/30 to-blue-500/30 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    <img
                      src={FOUNDER.image}
                      alt={FOUNDER.name}
                      referrerPolicy="no-referrer"
                      className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full object-cover ring-4 ring-primary-500/30 shadow-2xl"
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-bold shadow-lg whitespace-nowrap">
                      {t.founder.founderBadge}
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-center lg:text-start">
                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-1">
                    {FOUNDER.name}{FOUNDER.title ? <span className="text-xl sm:text-2xl text-gray-400 font-medium ms-2">{FOUNDER.title}</span> : null}
                  </h3>
                  <p className="text-lg text-primary-400 font-medium mb-5">{t.founder.role}</p>
                  <p className="text-gray-300 leading-relaxed text-base sm:text-lg mb-8">
                    {t.founder.bio}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {t.founder.highlights.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl glass-light">
                        <div className="w-8 h-8 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          {HIGHLIGHT_ICONS[i]}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white">{item.title}</p>
                          <p className="text-xs text-gray-400 leading-relaxed">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mb-8">
                    <p className="text-sm text-gray-400 mb-3 font-medium">{t.founder.specialtiesLabel}</p>
                    <div className="flex flex-wrap gap-2">
                      {t.founder.specialties.map((s) => (
                        <span key={s} className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    <a
                      href={FOUNDER.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-light hover:bg-white/10 text-white font-medium transition-all group text-sm"
                    >
                      <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      {t.founder.linkedinCta}
                      <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Full CV heading ─── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-4">
            <FileText className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-400">{t.founder.cvTitle}</span>
          </div>
        </div>

        {/* ─── Professional Experience Timeline ─── */}
        <div
          ref={experienceRef}
          className={`mb-20 transition-all duration-1000 ${experienceVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10 flex items-center justify-center gap-3">
            <Briefcase className="w-6 h-6 text-primary-400" />
            {t.founder.experienceTitle}
          </h3>
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute top-2 bottom-2 left-4 sm:left-1/2 sm:-translate-x-1/2 w-px bg-gradient-to-b from-primary-500/50 via-primary-500/30 to-transparent" />
            <div className="space-y-6">
              {FOUNDER_EXPERIENCE.map((exp, i) => (
                <div
                  key={i}
                  className={`relative flex items-start gap-6 sm:gap-0 ${
                    i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {/* Dot */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-3 w-3 h-3 rounded-full bg-primary-400 ring-4 ring-corp-900 shadow-lg shadow-primary-500/50 z-10" />

                  {/* Content card (alternating sides on desktop) */}
                  <div className={`ms-10 sm:ms-0 sm:w-1/2 ${i % 2 === 0 ? 'sm:pe-10 sm:text-end' : 'sm:ps-10 sm:text-start'}`}>
                    <div className="p-5 rounded-2xl glass hover-lift text-start">
                      <div className="flex items-center gap-2 text-xs text-primary-400 font-semibold mb-2 flex-wrap">
                        <span>{exp.year}</span>
                        <span className="text-gray-500">•</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{exp.location}</span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-1">{t.founder.experienceRoles[i]}</h4>
                      <p className="text-sm text-gray-400 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-primary-400 flex-shrink-0" />
                        {exp.org}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Education ─── */}
        <div
          ref={eduRef}
          className={`mb-20 transition-all duration-1000 ${eduVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10 flex items-center justify-center gap-3">
            <GraduationCap className="w-6 h-6 text-primary-400" />
            {t.founder.educationTitle}
          </h3>
          <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {FOUNDER_EDUCATION.map((edu, i) => (
              <div key={i} className="p-6 rounded-2xl glass hover-lift">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-blue-500/20 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-primary-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-primary-400 mb-1">{edu.year}</div>
                    <h4 className="text-base font-bold text-white mb-1">{t.founder.educationDegrees[i]}</h4>
                    <p className="text-sm text-gray-400">{edu.place}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Courses & Certifications ─── */}
        <div
          ref={coursesRef}
          className={`mb-20 transition-all duration-1000 ${coursesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10 flex items-center justify-center gap-3">
            <Award className="w-6 h-6 text-primary-400" />
            {t.founder.coursesTitle}
          </h3>
          <div className="grid sm:grid-cols-2 gap-3 max-w-5xl mx-auto">
            {FOUNDER_COURSES.map((course, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl glass-light hover:bg-white/10 transition-colors">
                <div className="w-7 h-7 rounded-full bg-primary-500/15 border border-primary-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Award className="w-3.5 h-3.5 text-primary-400" />
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{course}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Publications ─── */}
        <div
          ref={pubRef}
          className={`mb-20 transition-all duration-1000 ${pubVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10 flex items-center justify-center gap-3">
            <BookOpen className="w-6 h-6 text-primary-400" />
            {t.founder.publicationsTitle}
          </h3>
          <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {FOUNDER_PUBLICATIONS.map((pub, i) => (
              <div key={i} className="p-6 rounded-2xl glass hover-lift border-s-4 border-s-primary-500/50">
                <div className="text-xs font-semibold text-primary-400 mb-2">{pub.year}</div>
                <h4 className="text-base font-bold text-white mb-2 leading-snug">{pub.title}</h4>
                <p className="text-sm text-gray-400 italic">{pub.journal}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Languages ── */}
        <div
          ref={langRef}
          className={`mb-20 transition-all duration-1000 ${langVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10 flex items-center justify-center gap-3">
            <LanguagesIcon className="w-6 h-6 text-primary-400" />
            {t.founder.languagesTitle}
          </h3>
          <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {t.founder.languageNames.map((name, i) => (
              <div key={i} className="p-6 rounded-2xl glass text-center hover-lift">
                <div className="text-4xl mb-3">
                  {i === 0 ? '🇮🇷' : i === 1 ? '🇬🇧' : '🌍'}
                </div>
                <h4 className="text-lg font-bold text-white mb-1">{name}</h4>
                <p className="text-sm text-primary-400 font-medium">
                  {t.founder.languageLevels[levelKeys[i]]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Core Competencies / Skills ─── */}
        <div
          ref={valuesRef}
          className={`mb-20 transition-all duration-1000 ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10 flex items-center justify-center gap-3">
            <Wrench className="w-6 h-6 text-primary-400" />
            {t.founder.skillsTitle}
          </h3>
          <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
            {t.founder.skillNames.map((skill, i) => (
              <div
                key={i}
                className="px-5 py-2.5 rounded-full glass-light hover:bg-primary-500/10 border border-white/10 hover:border-primary-500/30 text-sm font-medium text-gray-200 transition-all cursor-default"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* ─── Mission & Vision ─── */}
        <div ref={missionRef} className="grid lg:grid-cols-2 gap-8 mb-20">
          <div className={`group relative overflow-hidden rounded-3xl glass hover-lift transition-all duration-1000 delay-100 ${missionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-primary-600" />
            <div className="p-8 sm:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/20 flex items-center justify-center">
                  <Target className="w-7 h-7 text-primary-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">{t.about.missionTitle}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">{t.about.missionText}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {t.about.missionTags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 text-xs font-medium rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className={`group relative overflow-hidden rounded-3xl glass hover-lift transition-all duration-1000 delay-300 ${missionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-violet-600" />
            <div className="p-8 sm:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-600/20 border border-blue-500/20 flex items-center justify-center">
                  <Eye className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">{t.about.visionTitle}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">{t.about.visionText}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {t.about.visionTags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 text-xs font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Core Values ─── */}
        <div className={`transition-all duration-1000 ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-2xl font-bold text-white text-center mb-10">{t.about.valuesTitle}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.about.values.map((value, i) => (
              <div key={i} className="group text-center p-6 rounded-2xl glass-light hover:bg-white/10 transition-all duration-300">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-lg font-semibold text-white mb-2">{value.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
