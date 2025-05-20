"use client"

import { useState, useEffect } from "react"
import { Copy, Share2, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

type ReferralLinkProps = {
  className?: string
}

export function ReferralLink({ className }: ReferralLinkProps) {
  const [loading, setLoading] = useState(true)
  const [referralLink, setReferralLink] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchReferralLink = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/referral/get-link")

        if (!response.ok) {
          throw new Error("Falha ao buscar link de referência")
        }

        const data = await response.json()
        setReferralLink(data.referralLink)
      } catch (err) {
        console.error("Erro ao buscar link de referência:", err)
        setError("Não foi possível carregar o link de referência")
      } finally {
        setLoading(false)
      }
    }

    fetchReferralLink()
  }, [])

  const copyToClipboard = async () => {
    if (!referralLink) return

    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      toast({
        title: "Link copiado!",
        description: "O link de indicação foi copiado para a área de transferência.",
      })

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      console.error("Erro ao copiar:", err)
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  const shareLink = async () => {
    if (!referralLink) return

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Amazon Mining - Programa de Indicação",
          text: "Junte-se a mim na Amazon Mining e ganhe recompensas!",
          url: referralLink,
        })
      } catch (err) {
        console.error("Erro ao compartilhar:", err)
      }
    } else {
      copyToClipboard()
    }
  }

  if (loading) {
    return (
      <div className={`bg-slate-800 rounded-lg p-6 ${className}`}>
        <h2 className="text-xl font-semibold mb-2">Seu Link de Indicação</h2>
        <p className="text-slate-400 mb-4">
          Compartilhe este link com seus amigos e ganhe comissões quando eles se cadastrarem.
        </p>
        <div className="flex justify-center items-center py-4">
          <Loader2 className="h-6 w-6 text-emerald-500 animate-spin" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`bg-slate-800 rounded-lg p-6 ${className}`}>
        <h2 className="text-xl font-semibold mb-2">Seu Link de Indicação</h2>
        <p className="text-red-400 mb-4">{error}</p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value="Erro ao carregar link"
            readOnly
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm"
          />
          <button
            disabled
            className="bg-slate-700 text-white rounded-lg p-2 opacity-50 cursor-not-allowed"
            title="Copiar"
          >
            <Copy size={20} />
          </button>
          <button
            disabled
            className="bg-emerald-600 text-white rounded-lg p-2 opacity-50 cursor-not-allowed"
            title="Compartilhar"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-slate-800 rounded-lg p-6 ${className}`}>
      <h2 className="text-xl font-semibold mb-2">Seu Link de Indicação</h2>
      <p className="text-slate-400 mb-4">
        Compartilhe este link com seus amigos e ganhe comissões quando eles se cadastrarem.
      </p>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm"
        />
        <button
          onClick={copyToClipboard}
          className={`${
            copied ? "bg-emerald-600" : "bg-slate-700 hover:bg-slate-600"
          } text-white rounded-lg p-2 transition-colors`}
          title="Copiar"
        >
          {copied ? <Copy size={20} /> : <Copy size={20} />}
        </button>
        <button
          onClick={shareLink}
          className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg p-2 transition-colors"
          title="Compartilhar"
        >
          <Share2 size={20} />
        </button>
      </div>
    </div>
  )
}
