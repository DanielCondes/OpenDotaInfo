// "use client";

// import { useRef } from "react";
// import html2canvas from "html2canvas";

// type ShareCardProps = {
//   profile: {
//     personaname: string;
//     avatarfull: string;
//   };
//   topHeroes: {
//     hero_id: number;
//     localized_name: string;
//     img: string;
//   }[];
// };

// export default function ShareCard({ profile, topHeroes }: ShareCardProps) {
//   const cardRef = useRef<HTMLDivElement>(null);

//   const exportImage = async () => {
//     if (!cardRef.current) return;

//     const canvas = await html2canvas(cardRef.current, {
//       scale: 2,
//       backgroundColor: "#0A0A0A",
//       useCORS: true,
//     });

//     const link = document.createElement("a");
//     link.href = canvas.toDataURL("image/png");
//     link.download = "perfil_dota.png";
//     link.click();
//   };

//   return (
//     <div className="flex flex-col items-center gap-4">
//       {/* TARJETA */}
//       <div
//         ref={cardRef}
//         className="w-[380px] rounded-2xl p-6 border border-gray-700 text-white"
//         style={{ backgroundColor: "#0A0A0A" }}
//       >
//         {/* PERFIL */}
//         <div className="flex items-center gap-4 mb-4">
//           <img
//             src={profile.avatarfull}
//             crossOrigin="anonymous"
//             className="w-20 h-20 rounded-full border border-gray-600"
//           />
//           <h2 className="text-xl font-bold">{profile.personaname}</h2>
//         </div>

//         {/* HEROES */}
//         <h3 className="text-sm mb-2 text-gray-300">Héroes favoritos</h3>
//         <div className="grid grid-cols-3 gap-3">
//           {topHeroes.slice(0, 6).map((h) => (
//             <div key={h.hero_id} className="text-center">
//               <img
//                 src={h.img}
//                 crossOrigin="anonymous"
//                 className="w-16 h-16 rounded-md mx-auto"
//               />
//               <p className="text-xs mt-1 truncate">{h.localized_name}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* BOTÓN */}
//       <button
//         onClick={exportImage}
//         className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-semibold text-white"
//       >
//         Descargar imagen
//       </button>
//     </div>
//   );
// }