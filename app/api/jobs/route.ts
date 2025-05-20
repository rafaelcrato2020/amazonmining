import { type NextRequest, NextResponse } from "next/server"
import { runJob, runDailyJobs, getAvailableJobs } from "@/lib/jobs/job-runner"

// Chave secreta para autenticar requisições
const API_SECRET_KEY = process.env.JOBS_API_SECRET_KEY || "change-me-in-production"

export async function GET(request: NextRequest) {
  // Verificar autenticação
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ") || authHeader.split(" ")[1] !== API_SECRET_KEY) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  // Listar jobs disponíveis
  const jobs = getAvailableJobs()

  return NextResponse.json({ jobs })
}

export async function POST(request: NextRequest) {
  // Verificar autenticação
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ") || authHeader.split(" ")[1] !== API_SECRET_KEY) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { job, date, dryRun } = body

    // Converter string de data para objeto Date
    const jobDate = date ? new Date(date) : new Date()

    if (job === "daily") {
      // Executar todos os jobs diários
      const results = await runDailyJobs({ date: jobDate, dryRun })
      return NextResponse.json({ results })
    } else if (job) {
      // Executar job específico
      const result = await runJob(job, { date: jobDate, dryRun })
      return NextResponse.json({ result })
    } else {
      return NextResponse.json({ error: "Parâmetro 'job' é obrigatório" }, { status: 400 })
    }
  } catch (error) {
    console.error("Erro ao processar requisição:", error)
    return NextResponse.json({ error: "Erro ao processar requisição" }, { status: 500 })
  }
}
