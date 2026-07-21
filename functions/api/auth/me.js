import { currentUser, json } from '../../_auth.js';
export async function onRequestGet({request,env}) { const u=await currentUser(request,env); if(!u)return json({error:'Unauthorized'},401); return json({user:{id:u.id,name:u.name,email:u.email,role:u.role,createdAt:u.createdAt}}); }
