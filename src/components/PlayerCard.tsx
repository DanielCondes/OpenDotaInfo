// type PlayerData = {
//   profile: {
//     personaname: string;
//     name: string | null;
//     avatarfull: string;
//     profileurl: string;
//     loccountrycode?: string;
//   };
//   rank_tier: number | null;
//   leaderboard_rank: number | null;
// };

// export default function PlayerCard({ player }: { player: PlayerData }) {
//   return (
//     <div className="max-w-sm mx-auto bg-zinc-900 text-white rounded-xl shadow-xl p-6 space-y-4">
//       {/* Avatar */}
//       <div className="flex justify-center">
//         <img
//           src={player.profile.avatarfull}
//           alt="Avatar"
//           className="w-24 h-24 rounded-full border-4 border-zinc-700"
//         />
//       </div>

//       {/* Nombre */}
//       <h2 className="text-center text-2xl font-bold">
//         {player.profile.personaname}
//       </h2>

//       {/* Nombre real (si existe) */}
//       {player.profile.name && (
//         <p className="text-center text-zinc-400">({player.profile.name})</p>
//       )}
// <div className="mt-4 space-y-2 text-sm text-gray-300">

//   {/* <div className="flex justify-between">
//     <span>Partidas ganadas</span>
//     <span className="text-emerald-400 font-semibold">
//       {wl.win}
//     </span>
//   </div> */}

//   {/* <div className="flex justify-between">
//     <span>Partidas perdidas</span>
//     <span className="text-rose-400 font-semibold">
//       {wl.lose}
//     </span>
//   </div> */}

//   {/* <div className="flex justify-between">
//     <span>Winrate</span>
//     <span className="font-bold">
//       {Math.round((wl.win / Math.max(1, wl.win + wl.lose)) * 100)}%
//     </span>
//   </div> */}

// </div>
// </div>
//       {/* Rank y Leaderboard */}
//       <div className="text-center">
//         <p className="text-lg">
//           <span className="font-semibold">Rank tier:</span>{" "}
//           {player.rank_tier ?? "No disponible"}
//         </p>
//         <p className="text-lg">
//           <span className="font-semibold">Leaderboard:</span>{" "}
//           {player.leaderboard_rank ?? "No disponible"}
//         </p>
//       </div>

//       {/* País */}
//       {player.profile.loccountrycode && (
//         <p className="text-center text-zinc-400">
//           País: {player.profile.loccountrycode}
//         </p>
//       )}

//       {/* Link a Steam */}
//       <a
//         href={player.profile.profileurl}
//         target="_blank"
//         className="block text-center bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold"
//       >
//         Ver perfil en Steam
//       </a>
//     </div>
//   );
// }