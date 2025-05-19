import type { NextApiRequest, NextApiResponse } from "next"
import { runJob, listJobs } from "@/lib/jobs/job-runner"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verificar autenticação
  const API_SECRET_KEY = process.env.JOBS_API_SECRET_KEY || "change-me-in-production"

  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ") || authHeader.split(" ")[1] !== API_SECRET_KEY) {
    return res.status(401).json({ error: "Não autorizado" })
  }

  // Listar jobs disponíveis
  if (req.method === "GET") {
    const jobs = listJobs()
    return res.status(200).json({ jobs })
  }

  // Executar job
  if (req.method === "POST") {
    try {
      const { job, dryRun = false } = req.body

      if (!job) {
        return res.status(400).json({ error: "Nome do job não especificado" })
      }

      const result = await runJob(job, dryRun)
      return res.status(200).json(result)
    } catch (error: any) {
      console.error(`Erro ao executar job:`, error)
      return res.status(500).json({
        error: "Erro ao executar job",
        message: error.message,
      })
    }
  }

  // Método não permitido
  return res.status(405).json({ error: "Método não permitido" })
}
