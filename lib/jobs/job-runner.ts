import { calculateDailyEarningsJob } from "./calculate-daily-earnings"
import { updateCareerRewardsJob } from "./update-career-rewards"
import { updateReferralPlansJob } from "./update-referral-plans"
import { updateActiveInvestmentsJob } from "./update-active-investments"
import type { Job, JobContext, JobResult } from "./types"

// Registrar todos os jobs disponíveis
const availableJobs: Record<string, Job> = {
  [calculateDailyEarningsJob.name]: calculateDailyEarningsJob,
  [updateCareerRewardsJob.name]: updateCareerRewardsJob,
  [updateReferralPlansJob.name]: updateReferralPlansJob,
  [updateActiveInvestmentsJob.name]: updateActiveInvestmentsJob,
}

export async function runJob(jobName: string, context?: Partial<JobContext>): Promise<JobResult> {
  const job = availableJobs[jobName]

  if (!job) {
    return {
      success: false,
      message: `Job não encontrado: ${jobName}`,
      errors: [{ code: "JOB_NOT_FOUND", message: `Job não encontrado: ${jobName}` }],
    }
  }

  const jobContext: JobContext = {
    date: context?.date || new Date(),
    dryRun: context?.dryRun || false,
  }

  try {
    return await job.execute(jobContext)
  } catch (error) {
    return {
      success: false,
      message: `Erro ao executar job ${jobName}`,
      errors: [error],
    }
  }
}

export async function runDailyJobs(context?: Partial<JobContext>): Promise<Record<string, JobResult>> {
  const results: Record<string, JobResult> = {}

  // Executar jobs diários em sequência
  results[calculateDailyEarningsJob.name] = await runJob(calculateDailyEarningsJob.name, context)
  results[updateActiveInvestmentsJob.name] = await runJob(updateActiveInvestmentsJob.name, context)
  results[updateReferralPlansJob.name] = await runJob(updateReferralPlansJob.name, context)
  results[updateCareerRewardsJob.name] = await runJob(updateCareerRewardsJob.name, context)

  return results
}

export function getAvailableJobs(): Record<string, { name: string; description: string }> {
  const jobs: Record<string, { name: string; description: string }> = {}

  for (const [name, job] of Object.entries(availableJobs)) {
    jobs[name] = {
      name: job.name,
      description: job.description,
    }
  }

  return jobs
}
