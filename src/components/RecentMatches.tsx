"use client";

import { useState } from "react";

export default function RecentMatches({
  accountId,
  initialMatches,
  heroMap,
}: {
  accountId: string;
  initialMatches: any[];
  heroMap: Record<number, { name: string; img: string }>;
}) {
  const [matches, setMatches] = useState(initialMatches);
  const [openMatch, setOpenMatch] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(initialMatches.length);
  const [hasMore, setHasMore] = useState(true);

  const limit = 10;

  async function loadMore() {
    try {
      setLoading(true);

      const res = await fetch(
        `https://api.opendota.com/api/players/${accountId}/matches?limit=${limit}&offset=${offset}`
      );

      if (!res.ok) throw new Error("API load more falló");

      const newRaw = await res.json();

      // si ya no vienen más
      if (!newRaw || newRaw.length === 0) {
        setHasMore(false);
        return;
      }

      // OJO: acá no tenemos heroStats en el client, así que mostramos match básico.
      // Si querés hero + img también, te doy la versión con heroMap.
      const newMapped = newRaw.map((m: any) => {
        const won = m.player_slot < 128 ? m.radiant_win : !m.radiant_win;
        return {
          match_id: m.match_id,
          hero_id: m.hero_id,
          won,
          duration: Math.floor(m.duration / 60),
          kills: m.kills,
          deaths: m.deaths,
          assists: m.assists,
          kda: `${m.kills}/${m.deaths}/${m.assists}`,
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

      setMatches((prev) => [...prev, ...newMapped]);
      setOffset((prev) => prev + newRaw.length);
    } catch (e) {
      console.error(e);
      alert("API load more falló");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h2 className="text-lg font-semibold mb-2">Partidas</h2>

      <div className="space-y-2">
        {matches.map((m: any) => (
          <div key={m.match_id} className="bg-gray-800 rounded">
            <button
              onClick={() => setOpenMatch(openMatch === m.match_id ? null : m.match_id)}
              className="w-full p-2 text-left hover:bg-gray-700 transition"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Match #{m.match_id}</div>
                <span className={m.won ? "text-emerald-400" : "text-rose-400"}>
                  {m.won ? "W" : "L"}
                </span>
              </div>
              <div className="text-xs text-gray-400">
                {m.kda} • {m.duration}m
              </div>
            </button>

            {openMatch === m.match_id && (
              <div className="border-t border-gray-700 p-3 text-xs text-gray-300">
                <div className="grid grid-cols-2 gap-2">
                  <div>GPM: {m.gpm}</div>
                  <div>XPM: {m.xpm}</div>
                  <div>Level: {m.level}</div>
                  <div>Hero dmg: {m.heroDamage}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={loadMore}
          disabled={loading}
          className="mt-4 w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 transition"
        >
          {loading ? "Cargando..." : "Cargar más"}
        </button>
      )}

      {!hasMore && (
        <p className="mt-3 text-center text-xs text-gray-400">
          No hay más partidas para cargar
        </p>
      )}
    </section>
  );
}