"use client";

import { useState } from "react";
import { Radio, MessageSquare, Settings, Home as HomeIcon, MonitorPlay, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AuthButtons } from "../components/AuthButtons";

const channels = [
  { id: "getv", name: "Ge Tv", src: "//redecanaistv.vision/player3/ch.php?canal=getv", badge: "GE TV" },
  { id: "sportv1", name: "Sportv 1", src: "//redecanaistv.vision/player3/ch.php?canal=sportv1", badge: "SPORTV" },
  { id: "sportv2", name: "Sportv 2", src: "//redecanaistv.vision/player3/ch.php?canal=sportv2", badge: "SPORTV" },
  { id: "sportv3", name: "Sportv 3", src: "//redecanaistv.vision/player3/ch.php?canal=sportv3", badge: "SPORTV" },
  { id: "espn1", name: "ESPN 1", src: "//redecanaistv.vision/player3/ch.php?canal=espn", badge: "ESPN" },
  { id: "premiere", name: "Premiere", src: "//redecanaistv.vision/player3/ch.php?canal=premiereclubes", badge: "PREMIERE" },
];

export default function TransmissoesPage() {
  const [activeChannel, setActiveChannel] = useState(channels[0]);
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
          className="p-2 rounded-xl bg-zinc-800/60 text-zinc-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* MENU LATERAL / SIDEBAR (Responsivo para Celular e PC) */}
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
            
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/40 transition-all">
              <HomeIcon className="w-4 h-4" /> Início
            </Link>

            <Link href="/transmissoes" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold bg-blue-600 text-white shadow-lg shadow-blue-600/25 transition-all">
              <Radio className="w-4 h-4 text-white" /> Transmissões
            </Link>

            <a href="https://discord.gg/3XWbv5PJPZ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/40 transition-all">
              <MessageSquare className="w-4 h-4 text-[#5865F2]" /> Comunidade Discord
            </a>
          </nav>
        </div>
        
        <div className="pt-4 border-t border-zinc-800/80">
          <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/40 transition-all">
            <Settings className="w-4 h-4" /> Configurações
          </button>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#090D16] border border-zinc-800/80 px-6 py-4 rounded-2xl md:rounded-[2rem]">
            <div>
              <h1 className="text-lg md:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                TRANSMISSÕES AO VIVO <span className="text-xs bg-red-600/20 text-red-400 border border-red-500/30 px-2.5 py-0.5 rounded-full font-bold">IPTV</span>
              </h1>
              <p className="text-xs text-zinc-400">Selecione o canal abaixo para assistir diretamente na plataforma</p>
            </div>
            
            <Link 
              href="/"
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold px-4 py-2 rounded-xl text-xs md:text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <HomeIcon className="w-4 h-4" /> Voltar ao Início
            </Link>
          </header>

          {/* PLAYER DE VÍDEO ATIVO */}
          <div className="bg-[#090D16] border border-zinc-800/80 rounded-2xl md:rounded-[2.5rem] p-4 md:p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center px-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
                <h2 className="text-sm md:text-base font-bold text-white tracking-wide">Assistindo: {activeChannel.name}</h2>
              </div>
              <span className="text-xs bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full font-bold">
                {activeChannel.badge}
              </span>
            </div>

            {/* Contêiner Proporcional para Celular e PC */}
            <div className="relative w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-inner flex items-center justify-center">
              <iframe 
                name="Player" 
                src={activeChannel.src} 
                frameBorder="0" 
                scrolling="no" 
                allow="encrypted-media; fullscreen; picture-in-picture" 
                allowFullScreen
                className="w-full h-full absolute inset-0 border-0"
              />
            </div>

            {/* AVISO DE SUPORTE / VPN PARA CELULAR E PC */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left mt-4">
              <div className="space-y-1">
                <h3 className="text-xs md:text-sm font-bold text-amber-400 flex items-center justify-center sm:justify-start gap-2">
                  ⚠️ O player não carregou ou deu erro de IP no celular/PC?
                </h3>
                <p className="text-[11px] md:text-xs text-zinc-400 max-w-xl">
                  Provedores de internet costumam bloquear o sinal. Utilize o aplicativo gratuito da Cloudflare (1.1.1.1) para liberar o acesso:
                </p>
              </div>
              
              <a
                href="https://one.one.one.one/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-4 py-2.5 rounded-xl text-xs transition-all whitespace-nowrap shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                Baixar / Ativar 1.1.1.1 ↗
              </a>
            </div>
          </div>

          {/* SELEÇÃO DE BOTÕES DOS CANAIS */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-2">Canais Disponíveis</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {channels.map((channel) => {
                const isSelected = activeChannel.id === channel.id;
                return (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel)}
                    className={`p-3 md:p-4 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold transition-all flex flex-col items-center justify-center gap-2 border cursor-pointer shadow-lg ${
                      isSelected 
                        ? "bg-blue-600 text-white border-blue-400 shadow-blue-600/30 scale-[1.02]" 
                        : "bg-[#090D16] text-zinc-300 border-zinc-800 hover:bg-zinc-800/60 hover:border-zinc-700"
                    }`}
                  >
                    <MonitorPlay className={`w-4 h-4 md:w-5 md:h-5 ${isSelected ? "text-white" : "text-blue-500"}`} />
                    <span>{channel.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
