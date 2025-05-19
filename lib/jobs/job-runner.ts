import { calculateDailyEarnings } from "./calculate-daily-earnings"
import { updateCareerRewards } from "./update-career-rewards"
import { updateReferralPlans } from "./update-referral-plans"
import { updateActiveInvestments } from "./update-active-investments"
import type { JobContext } from "./types"

type JobFunction = (dryRun: boolean) => Promise<any>

interface JobDefinition {
  name: string
  description: string
  run: JobFunction
}

const availableJobs: { [key: string]: JobDefinition } = {
  "calculate-daily-earnings": {
    name: "calculate-daily-earnings",
    description: "Calcula rendimentos diários para investimentos ativos",
    run: calculateDailyEarnings,
  },
  "update-career-rewards": {
    name: "update-career-rewards",
    description: "Verifica e atualiza recompensas do plano de carreira",
    run: updateCareerRewards,
  },
  "update-referral-plans": {
    name: "update-referral-plans",
    description: "Atualiza o nível do plano de referral dos usuários",
    run: updateReferralPlans,
  },
  "update-active-investments": {
    name: "update-active-investments",
    description: "Atualiza o valor de investimento ativo dos usuários",
    run: updateActiveInvestments,
  },
}

export async function runJob(
  jobName: string,
  context: JobContext,
): Promise<{
  job: string
  success: boolean
  dryRun: boolean
  executionTime?: number
  result?: any
  error?: string
}> {
  if (!availableJobs[jobName]) {
    throw new Error(`Job "${jobName}" não encontrado`)
  }

  const { dryRun } = context

  try {
    const job = availableJobs[jobName]
    console.log(`Executando job "${job.name}"${dryRun ? " (modo simulação)" : ""}...`)

    const startTime = Date.now()
    const result = await job.run(dryRun)
    const endTime = Date.now()

    console.log(`Job "${job.name}" concluído em ${endTime - startTime}ms`)

    return {
      job: job.name,
      success: true,
      dryRun,
      executionTime: endTime - startTime,
      result,
    }
  } catch (error: any) {
    console.error(`Erro ao executar job "${jobName}":`, error)
    return {
      job: jobName,
      success: false,
      dryRun,
      error: error.message,
    }
  }
}

export async function runDailyJobs(context: JobContext): Promise<{ [key: string]: any }> {
  const { dryRun } = context
  const results: { [key: string]: any } = {}

  for (const jobName of Object.keys(availableJobs)) {
    if (jobName !== "daily") {
      try {
        const result = await runJob(jobName, context)
        results[jobName] = result
      } catch (error: any) {
        console.error(`Erro ao executar job "${jobName}":`, error)
        results[jobName] = {
          job: jobName,
          success: false,
          dryRun,
          error: error.message,
        }
      }
    }
  }

  return results
}

export function getAvailableJobs(): {
  id: string
  name: string
  description: string
  lastRun: null
  nextRun: null
  status: string
}[] {
  return Object.values(availableJobs)
    .filter((job) => job.name !== "daily")
    .map((job) => ({
      id: job.name,
      name: job.name,
      description: job.description,
      lastRun: null,
      nextRun: null,
      status: "idle",
    }))
}

// Adicionando a função listJobs que está faltando
export function listJobs() {
  return Object.entries(availableJobs).map(([id, job]) => ({
    id,
    name: job.name,
    description: job.description,
    lastRun: null,
    nextRun: null,
    status: "idle",
  }))
}
