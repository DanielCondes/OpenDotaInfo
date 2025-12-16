
export interface PlayerProfile {
  account_id: number;
  personaname: string;
  avatarfull: string;
  profileurl: string;
  steamid: string;
}

export interface PlayerData {
  profile: PlayerProfile | null;
  rank_tier: number | null;
  leaderboard_rank: number | null;
  computed_mmr: number | null;
  computed_mmr_turbo: number | null;
  aliases: string[];
}

// =======================
// PLAYER INFO (BASE)
// =======================

export async function getPlayerInfo(id: string): Promise<PlayerData> {
  const res = await fetch(`https://api.opendota.com/api/players/${id}`, {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("No se pudo obtener el jugador");
  }

  return res.json();
}

// =======================
// BUSCAR JUGADOR POR NOMBRE
// =======================

export async function searchPlayerByName(name: string) {
  const res = await fetch(
    `https://api.opendota.com/api/search?q=${encodeURIComponent(name)}`,
    { next: { revalidate: 10 } }
  );

  if (!res.ok) {
    throw new Error("No se pudieron buscar jugadores");
  }

  return res.json();
}

// =======================
// HERO STATS (METADATA)
// =======================

export async function getHeroStats() {
  const res = await fetch("https://api.opendota.com/api/heroStats", {
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error("No se pudieron obtener los héroes");
  }

  return res.json();
}

// =======================
// HEROES DEL JUGADOR
// =======================

export async function getPlayerHeroes(id: string) {
  const res = await fetch(
    `https://api.opendota.com/api/players/${id}/heroes`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error("No se pudieron obtener los héroes del jugador");
  }

  return res.json();
}

// =======================
// ÚLTIMOS MATCHES
// =======================

export async function getPlayerRecentMatches(id: string) {
  const res = await fetch(
    `https://api.opendota.com/api/players/${id}/recentMatches`,
    { next: { revalidate: 30 } }
  );

  if (!res.ok) {
    throw new Error("No se pudieron obtener los últimos matches");
  }

  return res.json();
}

// =======================
// WIN / LOSE
// =======================

export async function getPlayerWinrate(id: string) {
  const res = await fetch(
    `https://api.opendota.com/api/players/${id}/wl`,
    { next: { revalidate: 20 } }
  );

  if (!res.ok) {
    throw new Error("No se pudo obtener win/lose");
  }

  return res.json(); // { win, lose }
}