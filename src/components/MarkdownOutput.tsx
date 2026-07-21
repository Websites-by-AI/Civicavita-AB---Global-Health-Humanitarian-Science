import { Fragment } from 'react';
function inline(value: string) { const parts=value.split(/(\*\*[^*]+\*\*)/g); return parts.map((p,i)=>p.startsWith('**')&&p.endsWith('**')?<strong key={i} className="font-semibold text-white">{p.slice(2,-2)}</strong>:<Fragment key={i}>{p}</Fragment>); }
export default function MarkdownOutput({ content }: { content: string }) {
 const lines=content.split('\n'); return <div className="space-y-3 text-sm leading-7 text-gray-300">{lines.map((line,i)=>{
  if(/^###\s+/.test(line)) return <h4 key={i} className="mt-5 text-base font-bold text-primary-300">{inline(line.replace(/^###\s+/,''))}</h4>;
  if(/^##\s+/.test(line)) return <h3 key={i} className="mt-6 text-lg font-bold text-white border-b border-white/10 pb-2">{inline(line.replace(/^##\s+/,''))}</h3>;
  if(/^#\s+/.test(line)) return <h2 key={i} className="text-xl font-bold text-white">{inline(line.replace(/^#\s+/,''))}</h2>;
  if(/^[*-]\s+/.test(line)) return <div key={i} className="flex gap-3"><span className="mt-3 h-1.5 w-1.5 rounded-full bg-orange-400 flex-none"/><span>{inline(line.replace(/^[*-]\s+/,''))}</span></div>;
  if(/^\d+\.\s+/.test(line)) return <div key={i} className="flex gap-3"><span className="text-primary-300 font-bold">{line.match(/^\d+/)?.[0]}.</span><span>{inline(line.replace(/^\d+\.\s+/,''))}</span></div>;
  if(line.trim()==='---') return <hr key={i} className="border-white/10 my-5"/>;
  if(!line.trim()) return <div key={i} className="h-1"/>;
  return <p key={i}>{inline(line)}</p>;
 })}</div>
}
