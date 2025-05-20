"use client"

import { useEffect, useState } from "react"

export default function MineracaoSimulada() {
  const [ganhos, setGanhos] = useState(0)

  useEffect(() => {
    const intervalo = setInterval(() => {
      setGanhos((prev) => +(prev + 0.0001).toFixed(6))
    }, 1000) // Atualiza a cada 1 segundo
    return () => clearInterval(intervalo)
  }, [])

  return (
    <div className="p-4 bg-black text-green-400 font-mono rounded-xl shadow-lg">
      <h2 className="text-xl">🛠️ Minerando em tempo real...</h2>
      <p>Ganhos: {ganhos} USDT</p>
      <p>Bloco atual: #{Math.floor(ganhos * 100000)}</p>
    </div>
  )
}
