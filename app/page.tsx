"use client";

import { useState } from "react";
import { Radio, MessageSquare, Settings, Home as HomeIcon, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AuthButtons } from "./components/AuthButtons";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#05070B] text-zinc-100 flex flex-col md:flex-row font-sans selection:bg-blue-600 selection:text-white">
      
      {/* MENU SUPERIOR MOBILE (Aparece apenas em celulares) */}
      <div className="md:hidden flex items-center justify-between bg-[#090D16] border-b border-zinc-800/80 p-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl overflow-hidden border border-blue-400/30 relative flex-shrink-0">
            <Image src="/logo.jpg" alt="Logo Cruzeiro E.C." fill className="object-cover" sizes="32px" />
          </div>
          <span className="font-bold text-sm tracking-tight text-white">CRUZEIRO E.C.</span>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-zinc-800/60 text-zinc-300 hover:text-white cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* SIDEBAR RESPONSIVA */}
      <aside className={`w-full md:w-72 bg-[#090D16] border-r border-zinc-800/80 p-6 flex flex-col justify-between ${mobileMenuOpen ? 'flex' : 'hidden'} md:flex fixed md:sticky top-[65px] md:top-0 h-[calc(100vh-65px)] md:h-screen z-40 overflow-y-auto`}>
        <div className="space-y-6">
          <div className="hidden md:flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-lg shadow-blue-600/30 border border-blue-400/30 relative flex-shrink-0">
              <Image src="/logo.jpg" alt="Logo Cruzeiro E.C." fill className="object-cover" sizes="40px" />
            </div>
            <div>
              <h2 className="font-bold text-sm tracking-tight text-white">CRUZEIRO E.C.</h2>
              <p className="text-[11px] text-zinc-400 font-medium">Plataforma Oficial</p>
            </div>
          </div>
          
          <AuthButtons />
          
          <nav className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-3">Menu Principal</span>
            
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold bg-blue-600 text-white shadow-lg shadow-blue-600/25 transition-all">
              <HomeIcon className="w-4 h-4 text-white" /> Início
            </Link>

            <Link href="/transmissoes" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/40 transition-all">
              <Radio className="w-4 h-4 text-blue-500" /> Transmissões
            </Link>

            <a href="https://discord.gg/3XWbv5PJPZ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/40 transition-all">
              <MessageSquare className="w-4 h-4 text-[#5865F2]" /> Comunidade Discord
            </a>
          </nav>
        </div>
        
        <div className="pt-4 border-t border-zinc-800/80">
          <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/40 transition-all cursor-pointer">
            <Settings className="w-4 h-4" /> Configurações
          </button>
        </div>
      </aside>

      {/* CONTEÚDO DA PÁGINA INICIAL */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#090D16] border border-zinc-800/80 px-6 py-4 rounded-2xl md:rounded-[2rem]">
            <div>
              <h1 className="text-lg md:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                PAINEL PRINCIPAL <span className="text-xs bg-blue-600/20 text-blue-400 border border-blue-500/30 px-2.5 py-0.5 rounded-full font-bold">CRUZEIRO</span>
              </h1>
              <p className="text-xs text-zinc-400">Bem-vindo à sua plataforma oficial de transmissões e conteúdo</p>
            </div>
            <Link 
              href="/transmissoes"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs md:text-sm transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2 cursor-pointer"
            >
              <Radio className="w-4 h-4" /> Ir para Transmissões
            </Link>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bloco Principal */}
            <div className="md:col-span-2 bg-[#090D16] border border-zinc-800/80 rounded-2xl md:rounded-[2.5rem] p-6 md:p-8 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block">
                  Plataforma 100% Online
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white">Tudo em um só lugar</h2>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
                  Acesse transmissões ao vivo com múltiplos canais em iframe integrado e interaja com a comunidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
