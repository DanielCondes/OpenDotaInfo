
import { searchPlayerByName } from "@/lib/opendota";
import Link from "next/link";

export default async function PlayerResultsPage({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const { query } = await params; // ✅ CORRECTO

  const players = await searchPlayerByName(query);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">
          Resultados para <span className="text-blue-400">{query}</span>
        </h1>

        {players.length === 0 && (
          <p className="text-gray-400">No se encontraron jugadores</p>
        )}

        <div className="space-y-3">
          {players.map((p: any) => (
            <Link
              key={p.account_id}
              href={`/player/${p.account_id}`}
              className="
                block
                bg-gray-800 hover:bg-gray-700
                p-4 rounded-xl
                transition
                border border-gray-700
              "
            >
              <div className="flex items-center gap-4">
                <img
                  src={p.avatarfull}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-lg">
                    {p.personaname}
                  </p>
                  <p className="text-sm text-gray-400">
                    ID: {p.account_id}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}