import RecentMatches from "@/components/RecentMatches";
import {
  getPlayerInfo,
  getPlayerHeroes,
  getHeroStats,
  getPlayerWinrate,
  getPlayerMatches,
} from "@/lib/opendota";

function buildHeroImage(meta: any) {
  if (!meta?.name) return "";
  const clean = meta.name.replace("npc_dota_hero_", "");
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${clean}.png`;
}

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const accountId = id;

  const [player, heroes, heroStats, wl, recent] = await Promise.all([
    getPlayerInfo(accountId),
    getPlayerHeroes(accountId),
    getHeroStats(),
    getPlayerWinrate(accountId),
    getPlayerMatches(accountId, 10, 0), // ✅ primera “página”
  ]);

  const profile = player.profile;
  if (!profile) {
    return <div className="min-h-screen bg-gray-900 text-white p-8">Player profile not found</div>;
  }

  // Map rápido para hero_id -> data (para el client)
  const heroMap: Record<number, { name: string; img: string }> = {};
  for (const h of heroStats) {
    heroMap[h.id] = {
      name: h.localized_name,
      img: buildHeroImage(h),
    };
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

  const lastMatches = recent.map((m: any) => {
    const won = m.player_slot < 128 ? m.radiant_win : !m.radiant_win;
    return {
      match_id: m.match_id,
      hero_id: m.hero_id,
      won,
      duration: Math.floor(m.duration / 60),
      kills: m.kills,
      deaths: m.deaths,
      assists: m.assists,
      gpm: m.gold_per_min,
      xpm: m.xp_per_min,
      level: m.level,
      heroDamage: m.hero_damage,
      towerDamage: m.tower_damage,
      lane: m.lane,
      role: m.role,
      items: [m.item_0, m.item_1, m.item_2, m.item_3, m.item_4, m.item_5],
    };
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 max-w-4xl mx-auto space-y-6">
      {/* PERFIL */}
      <div className="flex items-center justify-between gap-6 bg-gray-800/80 p-5 rounded-2xl border border-gray-700">
        <div className="flex items-center gap-4">
          <img src={profile.avatarfull} alt="avatar" className="w-16 h-16 rounded-full border-2 border-gray-600" />
          <div>
            <h1 className="text-2xl font-bold">{profile.personaname || "Jugador sin nombre"}</h1>
            <p className="text-sm flex items-center gap-2">
              <span className="text-green-400 font-semibold">{wl.win}W</span>
              <span className="text-gray-500">/</span>
              <span className="text-red-400 font-semibold">{wl.lose}L</span>
            </p>
          </div>
        </div>

        {profile.profileurl && (
          <a
            href={profile.profileurl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-black hover:bg-gray-600 text-sm font-medium transition"
          >
            Steam ↗
          </a>
        )}
      </div>

      {/* HEROES */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Héroes favoritos</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {topHeroes.map((h) => (
            <div key={h.hero_id} className="bg-gray-800 p-2 rounded-lg text-center">
              <img src={h.img} className="w-14 mx-auto rounded" />
              <p className="text-xs font-medium mt-1 truncate">{h.name}</p>
              <p className="text-[11px] text-gray-400">{h.winrate}%</p>
            </div>
          ))}
        </div>
      </section>

      {/* MATCHES con cargar más */}
      <RecentMatches accountId={accountId} heroMap={heroMap} initialMatches={lastMatches} />
    </div>
  );
}