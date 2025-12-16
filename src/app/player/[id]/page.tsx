import {
  searchPlayerByName,
  getPlayerInfo,
  getPlayerHeroes,
  getPlayerRecentMatches,
  getHeroStats,
  getPlayerWinrate,
} from "@/lib/opendota";

// Imagen oficial del héroe
function buildHeroImage(meta: any) {
  if (!meta?.name) return "";

  const clean = meta.name.replace("npc_dota_hero_", "");

  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${clean}.png`;
}
function getRankInfo(rankTier: number | null) {
  if (!rankTier) return null;

  const tier = Math.floor(rankTier / 10);
  const stars = rankTier % 10;

  const names: Record<number, string> = {
    1: "Herald",
    2: "Guardian",
    3: "Crusader",
    4: "Archon",
    5: "Legend",
    6: "Ancient",
    7: "Divine",
    8: "Immortal",
  };
   return {
    tier,
    stars,
    name: names[tier] ?? "Unknown",
    image: `/ranks/${tier}.png`, // imagen local
  };
}
export default async function PlayerResultPage({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const { query } = await params; // ✅

  if (!query) {
    return <div>No query</div>;
  }

  // 1️⃣ Resolver accountId
  let accountId: number | null = null;

  if (!isNaN(Number(query))) {
    accountId = Number(query);
  } else {
    const search = await searchPlayerByName(query);
    accountId = search?.[0]?.account_id ?? null;
  }

  if (!accountId) {
    return <div className="p-8 text-white">Jugador no encontrado</div>;
  }

  // 2️⃣ Fetch en paralelo
  const [player, heroes, recent, heroStats, wl] = await Promise.all([
    getPlayerInfo(String(accountId)),
    getPlayerHeroes(String(accountId)),
    getPlayerRecentMatches(String(accountId)),
    getHeroStats(),
    getPlayerWinrate(String(accountId)),
  ]);

  const profile = player.profile;

  // 3️⃣ HEROES FAVORITOS
  const topHeroes = heroes
    .sort((a, b) => b.games - a.games)
    .slice(0, 6)
    .map((h) => {
      const meta = heroStats.find((x: any) => x.id === h.hero_id);
      return {
        hero_id: h.hero_id,
        name: meta?.localized_name ?? "Unknown",
        img: buildHeroImage(meta),
        games: h.games,
        winrate: Math.round((h.win / h.games) * 100),
      };
    });

  // 4️⃣ ÚLTIMOS 10 JUEGOS
  const lastMatches = recent.slice(0, 10).map((m: any) => {
    const meta = heroStats.find((x: any) => x.id === m.hero_id);
    const won = m.player_slot < 128 ? m.radiant_win : !m.radiant_win;

    return {
      match_id: m.match_id,
      hero: meta?.localized_name ?? "Unknown",
      heroImg: buildHeroImage(meta),
      kda: `${m.kills}/${m.deaths}/${m.assists}`,
      duration: Math.floor(m.duration / 60),
      won,
    };
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 max-w-6xl mx-auto space-y-10">

      {/* PERFIL */}
      <div className="flex items-center gap-4">
        <img
          src={profile?.avatarfull}
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">{profile?.personaname}</h1>
          <p className="text-gray-400">
            Winrate: {wl.win}W / {wl.lose}L
          </p>
        </div>
      </div>

        {/* RANGO / MMR */}
   {player.rank_tier ? (
       <div className="mt-2 text-sm text-gray-300">
          <div>Rank tier: {player.rank_tier}</div>

           {player.leaderboard_rank && (
          <div className="text-xs text-gray-400">
             Leaderboard #{player.leaderboard_rank}
          </div>
          )}
       </div>
) : (
  <div className="mt-2 bg-gray-700/40 p-2 rounded-lg text-sm text-gray-400">
    Sin rango calibrado
  </div>
)}

      {/* HEROES FAVORITOS */}
      <section>
        <h2 className="text-xl font-bold mb-4">Héroes favoritos</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {topHeroes.map((h) => (
            <div key={h.hero_id} className="bg-gray-800 p-3 rounded-xl text-center">
              <img
                src={h.img}
                className="w-20 mx-auto rounded-md"
              />
              <p className="font-semibold mt-2">{h.name}</p>
              <p className="text-sm text-gray-400">
                {h.games} games • {h.winrate}%
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ÚLTIMOS 10 JUEGOS */}
      <section>
        <h2 className="text-xl font-bold mb-4">Últimos 10 juegos</h2>
        <div className="space-y-3">
          {lastMatches.map((m) => (
            <div
              key={m.match_id}
              className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg"
            >
              <img src={m.heroImg} className="w-12 rounded-md" />
              <div className="flex-1">
                <p className="font-semibold">{m.hero}</p>
                <p className="text-sm text-gray-400">
                  KDA {m.kda} • {m.duration} min
                </p>
              </div>
              <span
                className={`font-bold ${
                  m.won ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {m.won ? "Victoria" : "Derrota"}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}