"use client"

import { useEffect, useState } from "react"

export default function AmazonMiningBot() {
  const [ganhosTotais, setGanhosTotais] = useState(Math.floor(Math.random() * 4_000_000) + 1_000_000) // 1M–5M inicial
  const [blocoAtual, setBlocoAtual] = useState(21874)
  const [hashRate, setHashRate] = useState(0)
  const [tempoAtivo, setTempoAtivo] = useState(0)

  useEffect(() => {
    const intervalo = setInterval(() => {
      setGanhosTotais((g) => (g < 10_000_000 ? +(g + Math.random() * 3000).toFixed(2) : g))
      setBlocoAtual((b) => b + 1)
      setHashRate(+(Math.random() * 7000 + 5000).toFixed(2)) // 5.000–12.000 MH/s
      setTempoAtivo((t) => t + 1)
    }, 1000)

    return () => clearInterval(intervalo)
  }, [])

  return (
    <div className="bg-gradient-to-br from-[#0b0b1a] to-[#1a0030] text-white p-6 rounded-2xl shadow-2xl border border-yellow-500">
      <h2 className="text-2xl font-bold text-yellow-400 text-center mb-4">⚡ Amazon Mining - Mineração Global</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm md:text-base text-center font-mono">
        <div>
          <p className="text-gray-400">Total Minerado</p>
          <p className="text-emerald-400 font-bold">{ganhosTotais.toLocaleString()} USDT</p>
        </div>
        <div>
          <p className="text-gray-400">Blocos</p>
          <p className="text-blue-400">{blocoAtual}</p>
        </div>
        <div>
          <p className="text-gray-400">Hash Rate</p>
          <p className="text-cyan-400">{hashRate} MH/s</p>
        </div>
        <div>
          <p className="text-gray-400">Tempo Ativo</p>
          <p>{tempoAtivo}s</p>
        </div>
      </div>
      <div className="mt-6 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-400 via-yellow-300 to-purple-500 animate-pulse"
          style={{ width: `${tempoAtivo % 100}%` }}
        />
      </div>
      <p className="mt-3 text-xs text-center text-gray-400 italic">
        Mineração coletiva visível a todos os usuários em tempo real.
      </p>
    </div>
  )
}
