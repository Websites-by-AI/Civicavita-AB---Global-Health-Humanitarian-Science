export default function BrandLogo({ compact = false }: { compact?: boolean }) {
  return <div className="flex items-center gap-3" aria-label="Civicavita AB">
    <svg viewBox="0 0 42 42" className="w-10 h-10 flex-none" role="img" aria-hidden="true">
      <defs><linearGradient id="civicMark" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#34d399"/><stop offset=".52" stopColor="#f97316"/><stop offset="1" stopColor="#34d399"/></linearGradient></defs>
      <path d="M21 3.5c8.7 0 15.8 7.1 15.8 15.8S29.7 35.1 21 35.1 5.2 28 5.2 19.3 12.3 3.5 21 3.5Z" fill="none" stroke="url(#civicMark)" strokeWidth="3"/>
      <path d="M12 24.8 19 15l4.1 6 6.9-9.8" fill="none" stroke="url(#civicMark)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="24.8" r="2" fill="#34d399"/><circle cx="30" cy="11.2" r="2" fill="#f97316"/>
    </svg>
    {!compact && <div className="leading-none tracking-tight"><div className="text-lg font-bold"><span className="text-emerald-300">Civicavita</span><span className="text-orange-400">.A</span><span className="text-emerald-300">B</span></div><div className="mt-1 text-[9px] uppercase tracking-[.2em] text-gray-400">Global Health</div></div>}
  </div>;
}
