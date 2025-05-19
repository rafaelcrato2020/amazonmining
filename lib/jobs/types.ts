export interface JobContext {
  date: Date
  dryRun: boolean
}

export interface JobResult {
  success: boolean
  message: string
  data?: any
  errors?: any[]
}

export interface Job {
  name: string
  description: string
  execute: (context: JobContext) => Promise<JobResult>
}
