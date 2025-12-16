export default function HomePage() {
  return (
    <main className="
  min-h-screen
  flex flex-col items-center justify-center
  gap-6
  bg-gradient-to-br from-gray-900 via-gray-800 to-black
  text-center
  px-4
">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white">
    Bienvenidos a <span className="text-blue-400">InfoDota</span>
  </h1>

  <p className="text-gray-400 max-w-xl text-lg">
    Buscá jugadores de Dota 2, analizá estadísticas, héroes favoritos
    y resultados recientes en segundos.
  </p>

      <a href="/player" className="
    inline-flex items-center justify-center
    px-8 py-3
    text-lg font-bold
    rounded-2xl
    bg-gradient-to-r from-blue-500 to-indigo-600
    text-white
    shadow-xl
    transition-all duration-200
    hover:from-blue-400 hover:to-indigo-500
    hover:-translate-y-0.5
    active:translate-y-0
  ">
        Comenzar
      </a>
      </main>
  )
}