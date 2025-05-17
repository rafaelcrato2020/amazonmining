import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  // Criar uma resposta padrão
  const res = NextResponse.next()

  // Criar cliente Supabase para o middleware
  const supabase = createMiddlewareClient({ req, res })

  // Verificar se há uma sessão ativa
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Se o usuário não estiver autenticado e tentar acessar a dashboard
  if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
    // Redirecionar para a página inicial
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Permitir o acesso
  return res
}

// Aplicar apenas às rotas do dashboard
export const config = {
  matcher: ["/dashboard/:path*"],
}
