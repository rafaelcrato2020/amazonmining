export type JobResult = {
  success: boolean
  message: string
  data?: any
  errors?: any[]
}

export type JobContext = {
  date: Date
  dryRun?: boolean
}

export interface Job {
  name: string
  description: string
  execute: (context: JobContext) => Promise<JobResult>
}
