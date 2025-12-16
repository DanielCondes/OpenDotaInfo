// "use client";

// import { useState } from "react";
// import ShareCard from "./ShareCard";

// /* =======================
//    TIPOS
// ======================= */
// interface Profile {
//   account_id: number;
//   personaname: string;
//   avatarfull: string;
//   profileurl?: string;
// }

// interface WinLose {
//   win: number;
//   lose: number;
// }

// interface Hero {
//   hero_id: number;
//   localized_name: string;
//   img: string;
//   winPercent: number;
// }

// interface Match {
//   match_id: number;
//   heroName?: string;
//   heroImg?: string;
//   won: boolean;
//   kills: number;
//   deaths: number;
//   assists: number;
//   duration: number;
// }

// interface PlayerProfileClientProps {
//   profile: Profile | null;
//   wl: WinLose;
//   topHeroes: Hero[];
//   recentMatches: Match[];

//   /* 🔥 NUEVOS DATOS */
//   mmr: number | null;
//   rankTier: number | null;
//   leaderboard: number | null;
// }

// /* =======================
//    COMPONENTE
// ======================= */
// export default function PlayerProfileClient({
//   profile,
//   wl,
//   topHeroes,
//   recentMatches,
//   mmr,
//   rankTier,
//   leaderboard,
// }: PlayerProfileClientProps) {
//   const [showShare, setShowShare] = useState(false);

//   /* ⛔ BLOQUEO TOTAL */
//   if (!profile) {
//     return (
//       <div className="p-6 text-gray-400">
//         Cargando perfil del jugador...
//       </div>
//     );
//   }

//   const wins = wl?.win ?? 0;
//   const losses = wl?.lose ?? 0;
//   const totalGames = wins + losses;
//   const winrate =
//     totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;

//   return (
//     <>
//       <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6">

//         {/* ================= PERFIL ================= */}
//         <aside className="col-span-12 md:col-span-4">
//           <div className="bg-gray-800 p-6 rounded-xl">
//             <img
//               src={profile.avatarfull}
//               alt="Avatar"
//               className="w-28 rounded-lg mb-4"
//             />

//             <h2 className="text-2xl font-bold">
//               {profile.personaname}
//             </h2>

//             {/* MMR */}
//             <div className="mt-4 bg-gray-700/40 p-3 rounded-lg">
//               <div className="text-xs text-gray-300">
//                 MMR estimado
//               </div>
//               <div className="text-lg font-semibold">
//                 {mmr ?? "N/D"}
//               </div>
//             </div>
  
// {/* RANK MEDALLA */}
// {rank && (
//   <div className="flex items-center gap-3 mt-3">
//     <img
//       src={rank.image}
//       alt={rank.name}
//       className="w-14 h-14"
//     />

//     <div>
//       <div className="font-semibold">{rank.name}</div>

//       {rank.tier < 8 ? (
//         <div className="flex gap-1 mt-1">
//           {Array.from({ length: rank.stars }).map((_, i) => (
//             <span key={i} className="text-yellow-400">★</span>
//           ))}
//         </div>
//       ) : (
//         <div className="text-sm text-yellow-400">
//           Immortal
//         </div>
//       )}

//       {player.leaderboard_rank && (
//         <div className="text-xs text-gray-400">
//           Leaderboard #{player.leaderboard_rank}
//         </div>
//       )}
//     </div>
//   </div>
// )}

//             {/* RANK */}
//             <div className="mt-3 text-sm text-gray-300 space-y-1">
//               <div className="flex justify-between">
//                 <span>Rank tier</span>
//                 <span>{rankTier ?? "N/D"}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Leaderboard</span>
//                 <span>{leaderboard ?? "-"}</span>
//               </div>
//             </div>

//             {/* WINRATE */}
//             <div className="mt-4 bg-gray-700/40 p-3 rounded-lg">
//               <div className="text-xs text-gray-300">
//                 Winrate total
//               </div>
//               <div className="text-lg font-semibold">
//                 {winrate}%
//               </div>
//               <div className="text-xs text-gray-400">
//                 {wins}W • {losses}L
//               </div>
//             </div>

//             {/* SHARE */}
//             <button
//               onClick={() => setShowShare(true)}
//               className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg"
//             >
//               Compartir perfil
//             </button>

//             {/* STEAM */}
//             {profile.profileurl && (
//               <a
//                 href={profile.profileurl}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="block mt-4 text-center py-2 rounded-lg
//                            bg-gradient-to-r from-orange-500 to-red-600
//                            text-black font-semibold"
//               >
//                 Ver perfil en Steam
//               </a>
//             )}
//           </div>
//         </aside>

//         {/* ================= HÉROES ================= */}
//         <section className="col-span-12 md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-4">
//           {topHeroes.map((h) => (
//             <div
//               key={h.hero_id}
//               className="bg-gray-800 p-3 rounded-xl text-center"
//             >
//               <img
//                 src={h.img}
//                 alt={h.localized_name}
//                 className="w-20 mx-auto mb-2"
//                 crossOrigin="anonymous"
//               />
//               <div className="font-semibold">
//                 {h.localized_name}
//               </div>
//               <div className="text-sm text-gray-400">
//                 {h.winPercent}% winrate
//               </div>
//             </div>
//           ))}
//         </section>
//       </div>

//       {/* ================= MODAL SHARE ================= */}
//       {showShare && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="bg-gray-800 p-6 rounded-xl relative">
//             <button
//               onClick={() => setShowShare(false)}
//               className="absolute top-2 right-2"
//             >
//               ✖
//             </button>

//             <ShareCard
//               profile={profile}
//               topHeroes={topHeroes}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
