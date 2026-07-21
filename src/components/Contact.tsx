import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Globe } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../i18n/LanguageContext';

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation(0.05);
  const { t } = useLanguage();
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactItems = [
    { icon: <Mail className="w-5 h-5" />, label: t.contact.email, value: 'smotallebi@civicavita.org', href: 'mailto:smotallebi@civicavita.org' },
    { icon: <Phone className="w-5 h-5" />, label: t.contact.phone, value: '+46 739751973', href: 'tel:+46739751973' },
    { icon: <MapPin className="w-5 h-5" />, label: t.contact.address, value: 'Lantmannagatan 6 C, 214 44 Malmö', href: 'https://www.google.com/maps/search/?api=1&query=Lantmannagatan+6+C,+214+44+Malm%C3%B6' },
    { icon: <Globe className="w-5 h-5" />, label: t.contact.workingHours, value: t.contact.workingHoursValue, href: '#' },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-corp-900 via-corp-800/80 to-corp-900" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6">
            <Mail className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-400">{t.contact.badge}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight mb-6">
            {t.contact.titlePart1}<span className="gradient-text">{t.contact.titleHighlight}</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">{t.contact.description}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Info */}
          <div className={`lg:col-span-2 space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            {contactItems.map((item, i) => (
              <a key={i} href={item.href} className="flex items-start gap-4 p-5 rounded-2xl glass-light hover:bg-white/10 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 flex-shrink-0 group-hover:bg-primary-500/20 transition-colors">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-0.5">{item.label}</p>
                  <p className="text-white font-medium">{item.value}</p>
                </div>
              </a>
            ))}
            <div className="rounded-2xl overflow-hidden glass h-48">
              <iframe
                src="https://www.google.com/maps?q=Lantmannagatan+6+C,+214+44+Malm%C3%B6&output=embed"
                width="100%" height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
                allowFullScreen loading="lazy" title="Office Location"
              />
            </div>
          </div>

          {/* Form */}
          <div className={`lg:col-span-3 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="rounded-3xl glass overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-primary-400 to-blue-500" />
              <div className="p-8 sm:p-10">
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mb-6">
                      <CheckCircle className="w-8 h-8 text-primary-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{t.contact.successTitle}</h3>
                    <p className="text-gray-400">{t.contact.successText}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">{t.contact.formName}</label>
                        <input type="text" required value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
                          placeholder={t.contact.formNamePlaceholder} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">{t.contact.formEmail}</label>
                        <input type="email" required value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
                          placeholder={t.contact.formEmailPlaceholder} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">{t.contact.formSubject}</label>
                      <select value={formState.subject} onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all">
                        <option value="" className="bg-corp-800">{t.contact.formSubjectPlaceholder}</option>
                        {t.contact.formSubjectOptions.map((opt, i) => (
                          <option key={i} value={opt} className="bg-corp-800">{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">{t.contact.formMessage}</label>
                      <textarea required rows={5} value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all resize-none"
                        placeholder={t.contact.formMessagePlaceholder} />
                    </div>

                    <button type="submit" className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      {t.contact.formSubmit}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
