"use client";

import { useState } from "react";

export default function RecentMatches({ matches }: { matches: any[] }) {
  const [openMatch, setOpenMatch] = useState<number | null>(null);

  function toggle(matchId: number) {
    setOpenMatch(openMatch === matchId ? null : matchId);
  }

  return (
    <section>
      <h2 className="text-lg font-semibold mb-2">Últimos 10 juegos</h2>

      <div className="space-y-2">
        {matches.map((m) => (
          <div key={m.match_id} className="bg-gray-800 rounded">
            {/* FILA PRINCIPAL */}
            <button
              onClick={() => toggle(m.match_id)}
              className="
                w-full
                flex items-center gap-3
                p-2
                text-left
                hover:bg-gray-700
                transition
              "
            >
              <img src={m.heroImg} className="w-10 rounded" />

              <div className="flex-1">
                <p className="text-sm font-medium">{m.hero}</p>
                <p className="text-xs text-gray-400">
                  KDA {m.kda} • {m.duration}m
                </p>
              </div>

              <span
                className={`text-xs font-semibold ${
                  m.won ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {m.won ? "W" : "L"}
              </span>
            </button>

            {/* DESPLEGABLE */}
            {openMatch === m.match_id && (
  <div className="border-t border-gray-700 px-4 py-3 text-xs text-gray-300 space-y-3">

    {/* STATS PRINCIPALES */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      <div><span className="text-gray-400">Kills:</span> {m.kills}</div>
      <div><span className="text-gray-400">Deaths:</span> {m.deaths}</div>
      <div><span className="text-gray-400">Assists:</span> {m.assists}</div>
      <div><span className="text-gray-400">Level:</span> {m.level}</div>
    </div>

    {/* ECONOMÍA */}
    <div className="grid grid-cols-2 gap-2">
      <div><span className="text-gray-400">GPM:</span> {m.gpm}</div>
      <div><span className="text-gray-400">XPM:</span> {m.xpm}</div>
    </div>

    {/* DAÑO */}
    <div className="grid grid-cols-2 gap-2">
      <div><span className="text-gray-400">Hero dmg:</span> {m.heroDamage}</div>
      <div><span className="text-gray-400">Tower dmg:</span> {m.towerDamage}</div>
    </div>

    {/* LANE / ROLE */}
    <div className="grid grid-cols-2 gap-2">
      <div><span className="text-gray-400">Lane:</span> {m.lane}</div>
      <div><span className="text-gray-400">Role:</span> {m.role}</div>
    </div>

  </div>
)}
          </div>
        ))}
      </div>
    </section>
  );
}