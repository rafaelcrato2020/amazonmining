import { createServerComponentClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const supabase = createServerComponentClient()

    // Troca o código de autenticação por uma sessão
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Redireciona para o dashboard após autenticação
  return NextResponse.redirect(new URL("/dashboard", request.url))
}
