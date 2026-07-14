import { useScrollAnimation, useCountUp } from '../hooks/useScrollAnimation';
import { STATS } from '../data/constants';
import { TrendingUp, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

function StatCard({ stat, index, isVisible, delay }: { stat: typeof STATS[0]; index: number; isVisible: boolean; delay: number }) {
  const count = useCountUp(stat.value, 2000, isVisible);
  const { t } = useLanguage();
  const translated = t.impact.stats[index];

  return (
    <div
      className={`text-center p-8 rounded-2xl glass-light hover:bg-white/10 transition-all duration-700 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-5xl sm:text-6xl font-bold gradient-text mb-2 tabular-nums">
        {Number.isInteger(stat.value) ? Math.round(count) : count.toFixed(1)}
        {stat.suffix}
      </div>
      <div className="text-lg font-semibold text-white mb-1">{translated.label}</div>
      <div className="text-sm text-gray-400">{translated.description}</div>
    </div>
  );
}

export default function Impact() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { t } = useLanguage();

  const testimonials = t.impact.testimonials;

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="impact" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-corp-900 via-corp-800/80 to-corp-900" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-[150px]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6">
            <TrendingUp className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-400">{t.impact.badge}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight mb-6">
            {t.impact.titlePart1}<span className="gradient-text">{t.impact.titleHighlight}</span>{t.impact.titlePart2}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">{t.impact.description}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {STATS.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} isVisible={isVisible} delay={200 + i * 150} />
          ))}
        </div>

        {/* Testimonials */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative rounded-3xl glass overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 via-blue-500 to-violet-500" />
            <div className="p-8 sm:p-12">
              <Quote className="w-10 h-10 text-primary-500/30 mb-6" />
              <div className="min-h-[120px] flex items-center">
                <blockquote className="text-xl sm:text-2xl text-gray-200 leading-relaxed font-light italic">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="font-semibold text-white text-lg">{testimonials[currentTestimonial].author}</div>
                  <div className="text-sm text-primary-400">{testimonials[currentTestimonial].role}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={prevTestimonial} className="p-2 rounded-full glass-light hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex gap-1.5 mx-2">
                    {testimonials.map((_, i) => (
                      <button key={i} onClick={() => setCurrentTestimonial(i)} className={`w-2 h-2 rounded-full transition-all ${i === currentTestimonial ? 'bg-primary-400 w-6' : 'bg-gray-600 hover:bg-gray-500'}`} />
                    ))}
                  </div>
                  <button onClick={nextTestimonial} className="p-2 rounded-full glass-light hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partners */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-8 font-medium">{t.impact.partnersTitle}</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {['WHO', 'UNICEF', 'Gates Foundation', 'MSF', 'Red Cross', 'USAID'].map((partner) => (
              <div key={partner} className="px-6 py-3 rounded-xl glass-light text-gray-400 text-sm font-semibold tracking-wide hover:text-white hover:bg-white/10 transition-all cursor-default">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
