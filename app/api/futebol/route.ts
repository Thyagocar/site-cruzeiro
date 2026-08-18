import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const leagueCode = searchParams.get("league") || "BSA";

  // Se for Copa do Brasil (ICB) ou outra não suportada no plano free, tratamos para não quebrar a aplicação
  if (leagueCode !== "BSA" && leagueCode !== "CL" && leagueCode !== "PL" && leagueCode !== "PD" && leagueCode !== "SA") {
    return NextResponse.json({ 
      success: true, 
      data: [], 
      message: "Competição indisponível no plano gratuito atual." 
    });
  }

  try {
    // Buscando as partidas da competição (removemos o filtro restritivo de LIVE para trazer a rodada atual)
    const res = await fetch(
      `https://api.football-data.org/v4/competitions/${leagueCode}/matches`,
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_API_KEY || "",
        },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      throw new Error(`Erro na API externa: ${res.statusText}`);
    }

    const data = await res.json();
    
    // Pegando as partidas (se houver)
    const formattedMatches = (data.matches || []).slice(0, 10).map((match: any) => ({
      teams: {
        home: { name: match.homeTeam.shortName || match.homeTeam.name, logo: match.homeTeam.crest },
        away: { name: match.awayTeam.shortName || match.awayTeam.name, logo: match.awayTeam.crest }
      },
      goals: {
        home: match.score.fullTime.home ?? 0,
        away: match.score.fullTime.away ?? 0
      },
      status: match.status
    }));

    return NextResponse.json({ success: true, data: formattedMatches });
  } catch (error) {
    return NextResponse.json(
      { success: false, data: [], error: "Falha ao carregar dados da API." },
      { status: 500 }
    );
  }
}