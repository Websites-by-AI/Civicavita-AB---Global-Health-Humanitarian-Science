import React, { useRef, useEffect, useState } from 'react';
import { marked } from 'marked';
import { useLanguage } from '../types';

interface ReportDisplayProps {
  generatedReport: string;
  isLoading: boolean;
  error: string | null;
}

const ReportDisplay: React.FC<ReportDisplayProps> = ({ generatedReport, isLoading, error }) => {
  const { t } = useLanguage();
  const endOfReportRef = useRef<HTMLDivElement>(null);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);
  const [reportHtml, setReportHtml] = useState('');

  const isComplete = !isLoading && generatedReport.length > 0 && !error;

  useEffect(() => {
    if (isLoading) {
      endOfReportRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [generatedReport, isLoading]);

  useEffect(() => {
    let isMounted = true;
    const parseMarkdown = async () => {
      if (generatedReport) {
        const html = await marked.parse(generatedReport);
        if (isMounted) setReportHtml(html);
      } else {
        if (isMounted) setReportHtml('');
      }
    };
    parseMarkdown();
    return () => { isMounted = false; };
  }, [generatedReport]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setIsExportMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const downloadFile = (filename: string, content: string | Blob | ArrayBuffer, mimeType: string) => {
    const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReport);
    setIsExportMenuOpen(false);
  };
  
  const handleDownloadMD = () => {
    downloadFile('report.md', generatedReport, 'text/markdown;charset=utf-8');
    setIsExportMenuOpen(false);
  };

  const handleDownloadDOCX = async () => {
    const reportHtmlString = await marked.parse(generatedReport);
    try {
      const htmlToDocxModule = await import('html-to-docx');
      const htmlToDocx = htmlToDocxModule.default;
      
      if (typeof htmlToDocx !== 'function') {
        console.error('Failed to load html-to-docx function', htmlToDocxModule);
        throw new Error('Could not convert to DOCX. The library did not load correctly.');
      }

      const docxBlob = await htmlToDocx(reportHtmlString, '', {
        margins: { top: 720, right: 720, bottom: 720, left: 720 }
      });
      downloadFile('report.docx', docxBlob, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    } catch (e) {
      console.error("Error converting HTML to DOCX:", e);
      alert(e instanceof Error ? e.message : "An error occurred while trying to generate the DOCX file.");
    }
    setIsExportMenuOpen(false);
  };

  const createHtmlContent = async (markdownContent: string) => {
    const parsedHtml = await marked.parse(markdownContent);
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t('reportDisplay.docTitle')}</title>
  <style>
    :root {
      --primary: #ec4899;
      --bg: #f9fafb;
      --text: #1f2937;
      --border: #e5e7eb;
    }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
      line-height: 1.6; 
      padding: 3rem 2rem; 
      max-width: 800px; 
      margin: 0 auto; 
      color: var(--text); 
      background-color: var(--bg);
    }
    .container {
      background: #ffffff;
      padding: 3rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    h1, h2, h3, h4, h5, h6 { margin-top: 1.5em; margin-bottom: 0.5em; font-weight: 600; color: #111827; }
    h1 { border-bottom: 2px solid var(--primary); padding-bottom: 0.3em; margin-top: 0; }
    h2 { border-bottom: 1px solid var(--border); padding-bottom: 0.3em; }
    code { font-family: monospace; background-color: #f3f4f6; padding: 0.2em 0.4em; border-radius: 4px; font-size: 0.9em; }
    pre { background-color: #1f2937; color: #f9fafb; padding: 1.25em; border-radius: 8px; overflow-x: auto; font-size: 0.9em;}
    pre code { background-color: transparent; padding: 0; color: inherit; }
    table { border-collapse: collapse; width: 100%; margin: 1.5em 0; border: 1px solid var(--border); }
    th, td { border: 1px solid var(--border); padding: 12px; text-align: left; }
    th { background-color: #f9fafb; font-weight: 600; }
    blockquote { color: #4b5563; margin: 1.5em 0; padding-left: 1.5em; border-left: 4px solid var(--primary); font-style: italic; }
    ul, ol { padding-left: 1.5em; margin-bottom: 1.5em; }
    li { margin-bottom: 0.5em; }
    a { color: var(--primary); text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    ${parsedHtml}
  </div>
</body>
</html>`;
  };
  
  const handleDownloadHTML = async () => {
    const htmlContent = await createHtmlContent(generatedReport);
    downloadFile('report.html', htmlContent, 'text/html;charset=utf-8');
    setIsExportMenuOpen(false);
  };

  const handlePrint = async () => {
    const htmlContent = await createHtmlContent(generatedReport);
    const printWindow = window.open('', '_blank');
    if(printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
    setIsExportMenuOpen(false);
  };

  const handleShareFacebook = () => {
    const url = window.location.href;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank');
    setIsExportMenuOpen(false);
  };

  const handleShareTwitter = () => {
    const url = window.location.href;
    const text = "Check out this document generated by Civicavita AI!";
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank');
    setIsExportMenuOpen(false);
  };

  const handleShareEmail = () => {
    const subject = "Shared Document from Civicavita AI";
    const body = `Check out this generated summary:\n\n${generatedReport.substring(0, 300)}...\n\nMore at: ${window.location.href}`;
    const shareUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(shareUrl, '_blank');
    setIsExportMenuOpen(false);
  };

  const handleShareInsta = () => {
    navigator.clipboard.writeText(`Link in bio! Civicavita AI Generated Content => ${window.location.href}`);
    alert("Instagram share text copied! Paste it in your Instagram post or story.");
    setIsExportMenuOpen(false);
  };

  return (
    <div className="min-h-[60vh] flex flex-col">
      <div className="flex justify-between items-center p-4 bg-slate-800/80 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white flex items-center" key={isComplete ? 'complete' : 'pending'}>
          {isComplete && (
            <svg className="h-5 w-5 text-pink-400 mr-2 animate-fade-in" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
          {t('reportDisplay.title')}
        </h3>
        {generatedReport && !isLoading && (
          <div className="flex items-center gap-3">
            {/* Quick Share Icons */}
            <div className="flex items-center gap-2 mr-2">
              <button onClick={handleShareFacebook} className="p-2 text-slate-300 hover:text-blue-500 hover:bg-slate-700 rounded-full transition-colors" title="Share to Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.324V1.325C24 .597 23.403 0 22.675 0z"/></svg>
              </button>
              <button onClick={handleShareTwitter} className="p-2 text-slate-300 hover:text-blue-400 hover:bg-slate-700 rounded-full transition-colors" title="Share to X (Twitter)">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </button>
              <button onClick={handleShareInsta} className="p-2 text-slate-300 hover:text-pink-500 hover:bg-slate-700 rounded-full transition-colors" title="Copy text for Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </button>
              <button onClick={handleShareEmail} className="p-2 text-slate-300 hover:text-green-500 hover:bg-slate-700 rounded-full transition-colors" title="Share via Email">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </button>
            </div>
            <div className="h-6 w-px bg-slate-700 mr-2"></div>
            <div className="relative" ref={exportMenuRef}>
              <button
                onClick={() => setIsExportMenuOpen(prev => !prev)}
                className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary font-medium text-sm rounded-md transition-colors flex items-center border border-primary/30"
              >
                {t('reportDisplay.export')}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {isExportMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-xl z-20 border border-slate-700 overflow-hidden">
                  <ul className="py-1 text-white">
                    <li className="px-4 py-2 hover:bg-slate-700 cursor-pointer text-sm" onClick={handleCopy}>{t('reportDisplay.copy')}</li>
                    <li className="px-4 py-2 hover:bg-slate-700 cursor-pointer text-sm" onClick={handleDownloadMD}>{t('reportDisplay.downloadMD')}</li>
                    <li className="px-4 py-2 hover:bg-slate-700 cursor-pointer text-sm" onClick={handleDownloadDOCX}>{t('reportDisplay.downloadDOCX')}</li>
                    <li className="px-4 py-2 hover:bg-slate-700 cursor-pointer text-sm" onClick={handleDownloadHTML}>{t('reportDisplay.downloadHTML')}</li>
                    <li className="px-4 py-2 hover:bg-slate-700 cursor-pointer text-sm" onClick={handlePrint}>{t('reportDisplay.printPDF')}</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="p-6 prose prose-invert prose-sm sm:prose-base max-w-none text-gray-300 flex-grow overflow-y-auto">
        {error && <div className="text-red-400 p-4 bg-red-900/50 rounded-md">{error}</div>}
        
        <div dangerouslySetInnerHTML={{ __html: reportHtml }} />

        {isLoading && (
           <div className="flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-dashed rounded-full animate-spin border-pink-400"></div>
            <span className="ml-2 text-gray-400">{t('reportDisplay.generating')}</span>
          </div>
        )}

        {!isLoading && !generatedReport && !error && (
            <div className="text-center text-gray-500 py-16">
                <p>{t('reportDisplay.placeholder1')}</p>
                <p>{t('reportDisplay.placeholder2')}</p>
            </div>
        )}
        <div ref={endOfReportRef} />
      </div>
    </div>
  );
};

export default ReportDisplay;