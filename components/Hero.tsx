
import React from 'react';
import { useLanguage, AppState, BlogPost, Project } from '../types';
import Icon from './Icon';

interface HomePageProps {
  setPage: (page: AppState['page']) => void;
  latestPosts: BlogPost[];
  featuredProjects: Project[];
}

const HomePage: React.FC<HomePageProps> = ({ setPage, latestPosts, featuredProjects }) => {
  const { t } = useLanguage();

  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const services: { iconKey: string; title: string; text: string }[] = t('home.services');
  const achievements: { iconKey: string; count: number; label: string; suffix: string }[] = t('home.achievements');
  const customerLogos: { img: string; alt: string }[] = t('home.customerLogos');


  return (
    <div className="animate-fade-in text-white">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-0 w-auto min-w-full min-h-full object-cover max-w-none"
          src={t('hero.videoUrl')}
        >
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900 z-0"></div>
        
        {/* Dynamic Glow Element behind text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-lg leading-tight"
              dangerouslySetInnerHTML={{ __html: t('hero.title') }} />
          <p className="mt-6 text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto drop-shadow-md font-medium">{t('hero.subtitle')}</p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <button
              onClick={() => setPage('projects')}
              className="px-8 py-4 bg-gradient-primary text-white font-bold rounded-full shadow-[0_0_15px_rgba(var(--theme-primary),0.5)] hover:shadow-[0_0_25px_rgba(var(--theme-primary),0.7)] hover:-translate-y-1 transition-all duration-300 text-lg"
            >
              {t('hero.button1')}
            </button>
            <button
              onClick={() => handleScrollTo('footer')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold rounded-full shadow-lg hover:-translate-y-1 transition-all duration-300 text-lg"
            >
              {t('hero.button2')}
            </button>
          </div>
        </div>
      </section>

      {/* Intro / Mission Section */}
      <section id="about" className="py-20 sm:py-32 relative bg-slate-900 border-t border-slate-800">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8 font-medium">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  Mission & Vision
                </div>
                <h2 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl mb-8 tracking-tight">{t('home.introTitle')}</h2>
                <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed mb-16 font-light">
                    {t('home.introText')}
                </p>
                {t('home.visionTitle') && (
                    <div className="bg-slate-800/40 p-8 sm:p-12 rounded-3xl border border-slate-700/50 backdrop-blur-sm shadow-xl">
                        <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">{t('home.visionTitle')}</h2>
                        <p className="text-xl text-gray-300 leading-relaxed font-light">
                            {t('home.visionText')}
                        </p>
                    </div>
                )}
            </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="py-16 sm:py-24 bg-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{t('home.servicesTitle')}</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div key={index} className="text-center p-6 bg-slate-900/60 rounded-lg shadow-lg backdrop-blur-sm border border-slate-700">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-slate-800 mx-auto text-primary border border-slate-700">
                    <Icon iconKey={service.iconKey} className="w-8 h-8"/>
                </div>
                <h3 className="mt-6 text-lg font-medium text-white">{service.title}</h3>
                <p className="mt-2 text-base text-gray-400">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 sm:py-24 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{t('home.portfolioTitle')}</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {featuredProjects.slice(0, 4).map((item, index) => (
                <div key={index} className="group bg-slate-800/70 rounded-lg shadow-lg backdrop-blur-sm border border-slate-700 overflow-hidden flex flex-col">
                    <div className="relative h-64 w-full overflow-hidden bg-slate-800 flex items-center justify-center">
                        {item.isLoadingImage ? (
                           <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-primary" role="status" aria-label="Loading image"></div>
                        ) : (
                           <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        )}
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                        <p className="text-gray-300 mb-4 flex-grow text-sm">{item.description}</p>
                         <div className="flex flex-wrap gap-2">
                            {item.tags.map(tag => (
                                <span key={tag} className="bg-slate-700 text-primary text-xs font-semibold px-2 py-1 rounded-full border border-slate-600">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
          </div>
           <div className="mt-12 text-center">
                <button onClick={() => setPage('projects')} className="px-8 py-3 border border-primary text-primary font-semibold rounded-md shadow-lg hover:bg-slate-800 transition-colors">
                    {t('hero.button1')}
                </button>
           </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 sm:py-24 bg-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{t('home.achievementsTitle')}</h2>
            </div>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
                {achievements.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <Icon iconKey={item.iconKey} className="w-10 h-10 text-primary"/>
                        <p className="text-4xl font-bold text-white mt-2">{item.count}{item.suffix}</p>
                        <p className="text-sm text-gray-400 mt-1">{item.label}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 sm:py-24 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{t('home.customersTitle')}</h2>
            </div>
            <div className="mt-12 flow-root">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center">
                    {customerLogos.map((logo, index) => (
                        <div key={index} className="flex justify-center">
                            <img className="max-h-12 opacity-60 hover:opacity-100 transition-opacity" src={logo.img} alt={logo.alt} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Blog/Insights Section */}
      <section className="py-16 sm:py-24 bg-slate-800/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{t('home.calendarTitle')}</h2>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {latestPosts.map((post, index) => (
                    <div key={index} className="group flex flex-col overflow-hidden rounded-lg shadow-lg bg-slate-900 border border-slate-700">
                        <div className="flex-shrink-0 h-48 w-full bg-slate-800 flex items-center justify-center">
                           {post.isLoadingImage ? (
                                <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-primary" role="status" aria-label="Loading image"></div>
                            ) : (
                                <img className="h-48 w-full object-cover" src={post.img} alt={post.title} />
                            )}
                        </div>
                        <div className="flex flex-1 flex-col justify-between p-6">
                            <div className="flex-1">
                                <a href={post.link} className="mt-2 block">
                                    <p className="text-xl font-semibold text-gray-100 group-hover:text-primary transition-colors">{post.title}</p>
                                </a>
                            </div>
                            <div className="mt-6 flex items-center">
                                <div className="text-sm text-gray-500">
                                    <time dateTime={post.date}>{post.date}</time>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
      </section>
    </div>
  );
};

export default HomePage;
