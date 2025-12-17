import RecentMatches from "@/components/RecentMatches";
import {
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

export default async function PlayerPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const accountId = id;

  const [player, heroes, recent, heroStats, wl] = await Promise.all([
    getPlayerInfo(accountId),
    getPlayerHeroes(accountId),
    getPlayerRecentMatches(accountId),
    getHeroStats(),
    getPlayerWinrate(accountId),
  ]);

  const profile = player.profile;

  if (!profile) {
    return <div className="min-h-screen bg-gray-900 text-white p-8">Player profile not found</div>;
  }

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

  

  const lastMatches = recent.slice(0, 10).map((m: any) => {
  const meta = heroStats.find((x: any) => x.id === m.hero_id);
  const won = m.player_slot < 128 ? m.radiant_win : !m.radiant_win;

  return {
    // Identidad
    match_id: m.match_id,
    hero: meta?.localized_name ?? "Unknown",
    heroImg: buildHeroImage(meta),

    // Resultado
    won,
    duration: Math.floor(m.duration / 60),

    // KDA detallado
    kills: m.kills,
    deaths: m.deaths,
    assists: m.assists,
    kda: `${m.kills}/${m.deaths}/${m.assists}`,

    // Economía
    gpm: m.gold_per_min,
    xpm: m.xp_per_min,
    level: m.level,

    // Daño
    heroDamage: m.hero_damage,
    towerDamage: m.tower_damage,

    // Rol / línea
    lane: m.lane,
    role: m.role,

    // Items finales
    items: [
      m.item_0,
      m.item_1,
      m.item_2,
      m.item_3,
      m.item_4,
      m.item_5,
    ],
  };
});

    return (
  <div className="min-h-screen bg-gray-900 text-white p-4 max-w-4xl mx-auto space-y-6">

    {/* PERFIL */}
    <div className="flex items-center gap-3">
      <img
        src={profile.avatarfull}
        className="w-14 h-14 rounded-full"
      />
      <div>
        <h1 className="text-xl font-semibold">
          {profile.personaname}
        </h1>
        <p className="text-xs text-gray-400">
          Winrate: {wl.win}W / {wl.lose}L
        </p>
      </div>
    </div>

    {/* HEROES FAVORITOS */}
    <section>
      <h2 className="text-lg font-semibold mb-2">Héroes favoritos</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {topHeroes.map((h) => (
          <div
            key={h.hero_id}
            className="bg-gray-800 p-2 rounded-lg text-center"
          >
            <img
              src={h.img}
              className="w-14 mx-auto rounded"
            />
            <p className="text-xs font-medium mt-1 truncate">
              {h.name}
            </p>
            <p className="text-[11px] text-gray-400">
              {h.winrate}%
            </p>
          </div>
        ))}
      </div>
    </section>

    {/* ÚLTIMOS 10 JUEGOS */}
   <RecentMatches matches={lastMatches} /> 

  </div>
)}