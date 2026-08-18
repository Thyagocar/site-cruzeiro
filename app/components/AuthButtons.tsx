"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { MessageSquare, LogIn, LogOut, User } from "lucide-react";

export function AuthButtons() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="flex items-center justify-between bg-[#121629] border border-zinc-800 rounded-2xl p-3">
        <div className="flex items-center gap-2 overflow-hidden">
          {session.user.image ? (
            <img src={session.user.image} alt="Avatar" className="w-8 h-8 rounded-full border border-blue-500" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              <User className="w-4 h-4" />
            </div>
          )}
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">{session.user.name}</p>
            <p className="text-[10px] text-zinc-400 truncate">{session.user.email}</p>
          </div>
        </div>
        <button 
          onClick={() => signOut()} 
          title="Sair da conta"
          className="text-zinc-400 hover:text-red-400 p-1.5 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#0E1424] border border-zinc-800/80 rounded-2xl p-3.5 space-y-2">
      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-1">Autenticação</span>
      <div className="grid grid-cols-2 gap-2">
        <button 
          onClick={() => signIn("discord")}
          className="bg-[#5865F2]/10 hover:bg-[#5865F2] text-[#5865F2] hover:text-white border border-[#5865F2]/20 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5" /> Discord
        </button>
        <button 
          onClick={() => signIn("google")}
          className="bg-white/5 hover:bg-white text-zinc-300 hover:text-zinc-900 border border-white/10 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <LogIn className="w-3.5 h-3.5" /> Google
        </button>
      </div>
    </div>
  );
}