import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  // Criar uma resposta padrão
  const res = NextResponse.next()

  try {
    // Criar cliente Supabase para o middleware
    const supabase = createMiddlewareClient({ req, res })

    // Verificar se há uma sessão ativa
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Log para debug (será visível apenas nos logs do servidor)
    console.log("Middleware - URL:", req.nextUrl.pathname)
    console.log("Middleware - Session:", session ? "Existe" : "Não existe")

    // Se o usuário não estiver autenticado e tentar acessar a dashboard
    if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
      console.log("Middleware - Redirecionando para login")
      // Redirecionar para a página de login
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // Se o usuário estiver autenticado e tentar acessar login/register
    if (session && (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")) {
      console.log("Middleware - Redirecionando para dashboard")
      // Redirecionar para o dashboard
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    // Permitir o acesso
    return res
  } catch (error) {
    console.error("Middleware error:", error)
    // Em caso de erro, permitir o acesso (fail open)
    return res
  }
}

// Aplicar às rotas do dashboard e às páginas de login/registro
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
}
