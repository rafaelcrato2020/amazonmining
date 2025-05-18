import { runJob, runDailyJobs } from "@/lib/jobs/job-runner"

async function main() {
  const args = process.argv.slice(2)
  const jobName = args[0]
  const dryRun = args.includes("--dry-run")

  console.log(`Executando ${dryRun ? "(simulação) " : ""}${jobName || "todos os jobs diários"}...`)

  try {
    if (jobName && jobName !== "daily") {
      const result = await runJob(jobName, { dryRun })
      console.log(`Resultado do job ${jobName}:`, JSON.stringify(result, null, 2))
    } else {
      const results = await runDailyJobs({ dryRun })
      console.log("Resultados dos jobs diários:", JSON.stringify(results, null, 2))
    }
  } catch (error) {
    console.error("Erro ao executar jobs:", error)
    process.exit(1)
  }
}

main()
