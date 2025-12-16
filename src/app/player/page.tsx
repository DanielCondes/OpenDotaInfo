"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import ShareCard from "@/components/ShareCard";

export default function PlayerSearchPage() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/search/player/${query}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
      <div className="w-full max-w-md bg-gray-800/80 backdrop-blur p-8 rounded-2xl shadow-2xl border border-gray-700">
        <h1 className="text-3xl font-extrabold text-center mb-2">Buscar <span className="text-blue-400">Jugador</span></h1>

        <form onSubmit={handleSearch} className="space-y-5">
          <Input
            placeholder="Nombre de jugador o Steam ID"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full  bg-gray-900  border border-gray-600  text-white  placeholder-gray-500  focus:border-blue-500  focus:ring-2 focus:ring-blue-500/30  rounded-xl  h-12" />

          <Button className=" w-full  h-12  text-lg  font-semibold  rounded-xl  bg-blue-600  hover:bg-blue-500  transition-all  shadow-lg  hover:shadow-xl  active:scale-95" type="submit">
            Buscar
          </Button>
        </form>
      </div>
    </div>
  )
}
