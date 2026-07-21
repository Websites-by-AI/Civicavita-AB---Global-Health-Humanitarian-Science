import { ArrowUp, Heart } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { useLanguage } from '../i18n/LanguageContext';
import { useRouter } from '../context/RouterContext';

const FOOTER_HREFS = {
  organization: ['#about', '#team', '#contact', '#impact'],
  programs: ['#services', '#projects', '#services', '#projects'],
  resources: ['#impact', '#impact', '#projects', '#contact'],
};

export default function Footer() {
  const { t } = useLanguage();
  const { navigate } = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-corp-900 border-t border-white/5">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <div className="mb-5"><BrandLogo /></div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">{t.footer.description}</p>
            <div className="flex items-center gap-3">
              {[
                { label: 'Twitter', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                { label: 'LinkedIn', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
                { label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
              ].map((social) => (
                <a key={social.label} href="#" className="w-10 h-10 rounded-lg glass-light flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all" aria-label={social.label}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={social.path} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Organization */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">{t.footer.organizationTitle}</h4>
            <ul className="space-y-3">
              {t.footer.organization.map((label, i) => (
                <li key={label}><a href={FOOTER_HREFS.organization[i]} className="text-sm text-gray-400 hover:text-primary-400 transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">{t.footer.programsTitle}</h4>
            <ul className="space-y-3">
              {t.footer.programs.map((label, i) => (
                <li key={label}><a href={FOOTER_HREFS.programs[i]} className="text-sm text-gray-400 hover:text-primary-400 transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">{t.footer.resourcesTitle}</h4>
            <ul className="space-y-3">
              {t.footer.resources.map((label, i) => (
                <li key={label}><a href={FOOTER_HREFS.resources[i]} className="text-sm text-gray-400 hover:text-primary-400 transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="py-8 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-white font-semibold mb-1">{t.footer.newsletterTitle}</h4>
              <p className="text-sm text-gray-400">{t.footer.newsletterText}</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input type="email" placeholder={t.footer.newsletterPlaceholder}
                className="flex-1 sm:w-64 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50" />
              <button className="px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold rounded-xl hover:from-primary-400 hover:to-primary-500 transition-all shadow-lg shadow-primary-500/20">
                {t.footer.newsletterCta}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center sm:text-start">
            {t.footer.copyright} {t.footer.builtWith} <Heart className="w-3 h-3 inline text-primary-500" /> {t.footer.inStockholm}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">{t.footer.privacyPolicy}</a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">{t.footer.termsOfService}</a>
            <button onClick={() => navigate({ name: 'blog' })} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              {t.nav.blog}
            </button>
            <button onClick={() => navigate({ name: 'admin' })} className="text-xs text-gray-600 hover:text-gray-400 transition-colors" title="Admin">
              ⚙
            </button>
            <button onClick={scrollToTop} className="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all" aria-label="Back to top">
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
