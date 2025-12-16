import { getHeroStats } from "@/lib/opendota";

export default async function HeroesPage() {
  const heroes = await getHeroStats();

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Héroes de Dota 2</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {heroes.map((hero: any) => (
          <div
            key={hero.id}
            className="bg-zinc-900 p-4 rounded-xl shadow-lg hover:scale-105 transition"
          >
            {/* Imagen del héroe */}
            <img
              src={`https://api.opendota.com${hero.img}`}
              alt={hero.localized_name}
              className="rounded-lg mb-3 w-full"
            />

            {/* Nombre */}
            <h2 className="text-lg font-bold text-center">
              {hero.localized_name}
            </h2>

            {/* Roles */}
            <p className="text-sm text-center text-zinc-400">
              {hero.roles.join(", ")}
            </p>

            {/* Winrate */}
            <p className="text-center mt-2 text-green-400 font-semibold">
              Winrate: {((hero.pro_win / hero.pro_pick) * 100).toFixed(1)}%
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}