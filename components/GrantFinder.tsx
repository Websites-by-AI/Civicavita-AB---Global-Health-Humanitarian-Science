
import React, { useState } from 'react';
import { Grant } from '../types';
import { useLanguage } from '../types';

interface GrantFinderProps {
  onFindGrants: (keywords: string) => void;
  isLoading: boolean;
  error: string | null;
  grants: Grant[];
  onAnalyzeGrant: (grant: Grant) => void;
  keywords: string;
  setKeywords: (keywords: string) => void;
}

const GrantItem: React.FC<{ grant: Grant, onAnalyze: (grant: Grant) => void }> = ({ grant, onAnalyze }) => {
    const { t } = useLanguage();
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(grant.link);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 flex flex-col h-full">
            <div className="flex-grow">
                <h4 className="font-bold text-primary">{grant.grantTitle}</h4>
                <p className="text-sm text-gray-400">{t('grantFinder.from')} {grant.fundingBody}</p>
                <p className="text-sm text-gray-300 mt-2">{grant.summary}</p>
            </div>
            <div className="flex justify-between items-center pt-3 mt-3 border-t border-slate-700/50 flex-wrap gap-2">
                <div className="text-xs text-gray-500">
                    <strong>{t('grantAnalyzer.deadline')}:</strong> {grant.deadline}
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                     <button 
                        onClick={handleCopy}
                        className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors text-center ${isCopied ? 'bg-green-500/20 text-green-300' : 'bg-slate-600 text-white hover:bg-slate-500'}`}
                        title={t('grantFinder.copyLink')}
                    >
                        {isCopied ? t('grantFinder.copied') : t('grantFinder.copyLink')}
                    </button>
                    <a 
                        href={grant.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 border border-slate-600 text-white text-xs font-semibold rounded-md hover:bg-slate-700/50 transition-colors inline-flex items-center"
                        title={t('grantFinder.viewOriginal')}
                    >
                        {t('grantFinder.viewOriginal')}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 rtl:mr-1 rtl:ml-0" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" /><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" /></svg>
                    </a>
                    <button 
                        onClick={() => onAnalyze(grant)}
                        className="px-3 py-1 bg-teal-600 text-white text-xs font-semibold rounded-md hover:bg-teal-700 transition-colors"
                    >
                        {t('grantFinder.analyzeButton')}
                    </button>
                </div>
            </div>
        </div>
    );
};

const GrantFinder: React.FC<GrantFinderProps> = ({ onFindGrants, isLoading, error, grants, onAnalyzeGrant, keywords, setKeywords }) => {
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keywords.trim()) {
      onFindGrants(keywords);
    }
  };

  return (
    <section id="grant-finder" className="py-12 sm:py-16">
      <div className="bg-slate-900/60 rounded-lg p-8 shadow-lg backdrop-blur-sm border border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-white">{t('grantFinder.title')}</h2>
        
        {/* Suggested Terms */}
        <div className="mb-6">
            <div className="flex flex-wrap gap-2">
                {Array.isArray(t('grantFinder.suggestedTerms')) ? t('grantFinder.suggestedTerms').map((term: string, idx: number) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => setKeywords(term)}
                        className="px-3 py-1 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 rounded-full text-xs font-medium border border-slate-700 transition-colors"
                    >
                        {term}
                    </button>
                )) : null}
            </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="flex-grow bg-slate-700/80 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-white"
              placeholder={t('grantFinder.searchPlaceholder')}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="flex-shrink-0 flex justify-center py-2 px-6 border border-transparent rounded-md shadow-[0_0_15px_rgba(var(--theme-primary),0.3)] text-sm font-medium text-white bg-gradient-primary hover:shadow-[0_0_20px_rgba(var(--theme-primary),0.5)] disabled:bg-gray-500 disabled:shadow-none transition-all"
            >
              {isLoading ? t('grantFinder.searching') : t('grantFinder.searchButton')}
            </button>
          </div>
        </form>

        <div className="mt-8">
            {isLoading && (
                <div className="text-center text-gray-400">
                    <div className="w-6 h-6 border-2 border-dashed rounded-full animate-spin border-primary mx-auto"></div>
                    <p className="mt-2">{t('grantFinder.searching')}</p>
                </div>
            )}
            {error && !isLoading && <div className="text-red-400 p-4 bg-red-900/50 rounded-md">{t('grantFinder.error')}: {error}</div>}
            
            {!isLoading && !error && grants.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                    {grants.map((grant, index) => (
                        <GrantItem key={grant.link || index} grant={grant} onAnalyze={onAnalyzeGrant} />
                    ))}
                </div>
            )}

            {!isLoading && !error && grants.length === 0 && keywords && (
                 <div className="text-center text-gray-500 py-10">
                    <p>{t('grantFinder.noResults')}</p>
                </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default GrantFinder;
