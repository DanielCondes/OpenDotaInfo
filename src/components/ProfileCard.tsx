// "use client";
// import html2canvas from "html2canvas";
// import { useRef } from "react";

// export default function ProfileCard({ profile, topHeroes }) {
//   const cardRef = useRef(null);

//   const downloadCard = async () => {
//     const element = cardRef.current;

//     const canvas = await html2canvas(element, {
//       scale: 2,
//       backgroundColor: "#0f0f0f",
//     });

//     const link = document.createElement("a");
//     link.download = `${profile.personaname}_profile.png`;
//     link.href = canvas.toDataURL();
//     link.click();
//   };

//   const shareCard = async () => {
//     const element = cardRef.current;

//     const canvas = await html2canvas(element, { scale: 2 });
//     const file = await (await fetch(canvas.toDataURL())).blob();
//     const imageFile = new File([file], "profile.png", { type: "image/png" });

//     if (navigator.share) {
//       navigator.share({
//         title: "Mi perfil de Dota",
//         text: "Mirá mis estadísticas!",
//         files: [imageFile],
//       });
//     } else {
//       alert("Tu navegador no soporta compartir imágenes directamente.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center gap-4">
//   {/* Tarjeta para exportar */}
//   <div
//     ref={cardRef}
//     className="w-[380px] bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-700"
//   >
//     {/* Nombre + avatar */}
//     <div className="flex items-center gap-4 mb-4">
//       <img
//         src={profile.avatarfull}
//         className="w-20 h-20 rounded-full border-2 border-gray-700"
//       />
//       <div>
//         <h2 className="text-2xl font-bold">{profile.personaname}</h2>
//         <p className="text-gray-400">MMR: {profile.mmr_estimate.estimate}</p>
//       </div>
//     </div>

//     {/* Rank */}
//     <div className="mb-4">
//       <h3 className="font-semibold mb-1">Rango</h3>

//       <div className="flex items-center gap-2">
//         <img
//           src={`/ranks/${profile.rank_tier}.png`}
//           className="w-12 h-12"
//         />
//         <span className="text-gray-300 text-lg">
//           Estrellas: {profile.leaderboard_rank || "?"}
//         </span>
//       </div>
//     </div>

//     {/* Héroes favoritos */}
//     {/* Aquí vendría tu contenido */}
//   </div> 
// </div>
//   )}