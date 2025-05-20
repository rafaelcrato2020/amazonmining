import { createClient } from "@supabase/supabase-js"

// Versão para o servidor com a chave de serviço (não usa cookies)
export const createServerAdminClient = () => {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "", {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Função createServerComponentClient para compatibilidade
export const createServerComponentClient = (context?: { cookies?: any }) => {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "", {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Versão para o cliente (singleton)
let clientSupabaseClient: ReturnType<typeof createClient> | null = null

// Renomeando para manter compatibilidade com o código existente
export const createClientComponentClient = () => {
  if (clientSupabaseClient) return clientSupabaseClient

  clientSupabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    {
      auth: {
        persistSession: true,
        storageKey: "amazon-mining-auth",
      },
    },
  )

  return clientSupabaseClient
}

// Alias para manter compatibilidade com código existente
export const createClientSupabaseClient = createClientComponentClient

// Versão para API routes (pages/api)
export const createServerSupabaseClient = (req: any, res: any) => {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "", {
    auth: {
      persistSession: false,
    },
    global: {
      headers: {
        cookie: req.headers.cookie || "",
      },
    },
  })
}
