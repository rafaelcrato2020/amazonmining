import { createClient } from "@supabase/supabase-js"

// Verificar se as variáveis de ambiente estão definidas
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.error("Missing environment variable: NEXT_PUBLIC_SUPABASE_URL")
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error("Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY")
}

// Criar cliente para componentes do servidor
export function createServerComponentClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: {
      persistSession: false,
    },
  })
}

// Criar cliente para componentes do cliente
export function createClientComponentClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "amazon-mining-auth-token",
    },
  })
}
