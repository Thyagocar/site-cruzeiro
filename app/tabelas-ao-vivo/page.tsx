"use client";

import { useState, useEffect } from "react";
import { Radio, MessageSquare, Settings, Home as HomeIcon, Trophy, Shield, Clock, RefreshCw, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AuthButtons } from "../components/AuthButtons";

const COMPETITIONS_MAP: Record<string, { code: string; name: string; badge: string; url: string }> = {
  brasileirao: { code: "BSA", name: "Brasileirão Série A", badge: "PONTOS CORRIDOS", url: "https://www.sofascore.com/tournament/football/brazil/brasileiro-serie-a/325" },
  copadobrasil: { code: "ICB", name: "Copa do Brasil", badge: "MATA-MATA", url: "https://www.sofascore.com/tournament/football/brazil/copa-do-brasil/395" },
  libertadores: { code: "CL", name: "Liga dos Campeões (Exemplo Free)", badge: "INTERNACIONAL", url: "https://www.sofascore.com/tournament/international/copa-libertadores/384" },
};

export default function TabelasAoVivoAPI() {
  const [activeComp, setActiveComp] = useState("brasileirao");
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTournamentData = async (compKey: string) => {
    setLoading(true);
    setError(null);
    try {
      const compCode = COMPETITIONS_MAP[compKey].code;
      const response = await fetch(`/api/futebol?league=${compCode}`);
      const json = await response.json();

      if (!json.success) throw new Error(json.error || "Erro ao buscar dados.");
      
      setMatches(json.data || []);
    } catch (err) {
      setError("Não foi possível carregar os dados ao vivo no momento. Verifique sua chave de API.");
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournamentData(activeComp);
  }, [activeComp]);

  return (
    <div className="min-h-screen bg-[#05070B] text-zinc-100 flex font-sans selection:bg-blue-600 selection:text-white">
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#090D16] border-r border-zinc-800/80 p-6 flex flex-col justify-between hidden md:flex sticky top-0 h-screen">
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
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
            
            <Link href="/" className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/40 transition-all">
              <HomeIcon className="w-4 h-4" /> Início
            </Link>

            <Link href="/transmissoes" className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/40 transition-all">
              <Radio className="w-4 h-4 text-blue-500" /> Transmissões
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
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          <header className="flex justify-between items-center bg-[#090D16] border border-zinc-800/80 px-6 py-4 rounded-[2rem]">
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                JOGOS AO VIVO (API) <span className="text-xs bg-blue-600/20 text-blue-400 border border-blue-500/30 px-2.5 py-0.5 rounded-full font-bold">TEMPO REAL</span>
              </h1>
              <p className="text-xs text-zinc-400">Dados consumidos via API de integração de futebol</p>
            </div>
            
            <button 
              onClick={() => fetchTournamentData(activeComp)}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold px-4 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Atualizar
            </button>
          </header>

          {/* SELEÇÃO DE CAMPEONATOS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.entries(COMPETITIONS_MAP).map(([key, comp]) => {
              const isSelected = activeComp === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveComp(key)}
                  className={`p-4 rounded-2xl text-sm font-bold transition-all flex items-center justify-between border cursor-pointer shadow-lg ${
                    isSelected 
                      ? "bg-blue-600 text-white border-blue-400 shadow-blue-600/30 scale-[1.02]" 
                      : "bg-[#090D16] text-zinc-300 border-zinc-800 hover:bg-zinc-800/60 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Trophy className={`w-5 h-5 ${isSelected ? "text-white" : "text-blue-500"}`} />
                    <span className="text-left">{comp.name}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${isSelected ? "bg-blue-700 text-white" : "bg-zinc-800 text-zinc-400"}`}>
                    {comp.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* PAINEL DE EXIBIÇÃO DOS JOGOS DA API */}
          <div className="bg-[#090D16] border border-zinc-800/80 rounded-[2.5rem] p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-500" />
                <h2 className="text-lg font-extrabold text-white">Partidas e Confrontos - {COMPETITIONS_MAP[activeComp].name}</h2>
              </div>
              <div className="flex items-center gap-4">
                <a 
                  href={COMPETITIONS_MAP[activeComp].url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                >
                  Ver no SofaScore <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span className="text-xs text-zinc-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Atualizado em tempo real
                </span>
              </div>
            </div>

            {loading ? (
              <div className="py-16 text-center text-zinc-400 space-y-3">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-500" />
                <p className="text-sm">Buscando confrontos atualizados...</p>
              </div>
            ) : error ? (
              <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-8 text-center space-y-3">
                <p className="text-amber-400 text-sm font-semibold">{error}</p>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  Verifique se o seu plano na Football-Data.org dá acesso direto às partidas da competição selecionada.
                </p>
              </div>
            ) : matches.length === 0 ? (
              <div className="py-12 text-center text-zinc-400 text-sm">
                Nenhum jogo encontrado para esta competição no momento.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matches.map((match, index) => (
                  <div key={index} className="bg-zinc-900/50 border border-zinc-800/80 p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3 w-2/5 justify-end">
                      <span className="text-xs font-bold text-right truncate">{match.teams.home.name}</span>
                      {match.teams.home.logo && (
                        <img src={match.teams.home.logo} alt="" width={24} height={24} className="object-contain w-6 h-6" />
                      )}
                    </div>
                    <div className="px-3 py-1 bg-zinc-800/80 rounded-xl text-xs font-mono font-bold text-blue-400">
                      {match.goals.home ?? 0} x {match.goals.away ?? 0}
                    </div>
                    <div className="flex items-center gap-3 w-2/5">
                      {match.teams.away.logo && (
                        <img src={match.teams.away.logo} alt="" width={24} height={24} className="object-contain w-6 h-6" />
                      )}
                      <span className="text-xs font-bold truncate">{match.teams.away.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}