import { json, unauthorized } from './_lib.js';
const enc = new TextEncoder();
const b64 = (bytes) => { let s=''; for (const b of bytes) s+=String.fromCharCode(b); return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,''); };
const from64 = (s) => Uint8Array.from(atob(s.replace(/-/g,'+').replace(/_/g,'/') + '==='.slice((s.length+3)%4)), c=>c.charCodeAt(0));
export const makeSalt = () => b64(crypto.getRandomValues(new Uint8Array(16)));
export async function hashPassword(password, salt) { const key=await crypto.subtle.importKey('raw',enc.encode(password),'PBKDF2',false,['deriveBits']); return b64(new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2',salt:from64(salt),iterations:210000,hash:'SHA-256'},key,256))); }
export async function verifyPassword(password, salt, expected) { const actual=await hashPassword(password,salt); if(actual.length!==expected.length)return false; let n=0; for(let i=0;i<actual.length;i++) n|=actual.charCodeAt(i)^expected.charCodeAt(i); return n===0; }
export async function countAdmins(env) { return (await env.DB.prepare("SELECT COUNT(*) AS count FROM users WHERE role='admin'").first())?.count || 0; }
export async function currentUser(request, env) { const cookie=request.headers.get('Cookie')?.match(/(?:^|; )civicavita_admin=([^;]+)/)?.[1]; if(!cookie||!env.JWT_SECRET)return null; const [body,sig]=cookie.split('.'); if(!body||!sig)return null; const key=await crypto.subtle.importKey('raw',enc.encode(env.JWT_SECRET),{name:'HMAC',hash:'SHA-256'},false,['sign']); const expected=b64(new Uint8Array(await crypto.subtle.sign('HMAC',key,enc.encode(body)))); if(expected!==sig)return null; try { const d=JSON.parse(new TextDecoder().decode(from64(body))); return d.exp>Date.now()?d:null; } catch{return null;} }
export async function createUserSession(user, env) { const body=b64(enc.encode(JSON.stringify({id:user.id,email:user.email,name:user.name,role:user.role,exp:Date.now()+28800000}))); const key=await crypto.subtle.importKey('raw',enc.encode(env.JWT_SECRET),{name:'HMAC',hash:'SHA-256'},false,['sign']); return `${body}.${b64(new Uint8Array(await crypto.subtle.sign('HMAC',key,enc.encode(body))))}`; }
export async function adminGuard(request, env) { const user=await currentUser(request,env); if(!user||user.role!=='admin') return {error:unauthorized()}; return {user}; }
export const cookie=(token)=>`civicavita_admin=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800`;
export { json };
