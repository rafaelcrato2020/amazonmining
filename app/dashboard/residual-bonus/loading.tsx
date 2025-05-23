import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <Skeleton className="h-10 w-[250px] bg-slate-800" />
          <Skeleton className="h-4 w-[350px] mt-2 bg-slate-800" />
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-6 w-[200px] bg-slate-800" />
            <Skeleton className="h-6 w-6 rounded-full bg-slate-800" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-24 w-full bg-slate-800" />

            <div className="flex gap-2 mb-4">
              <Skeleton className="h-10 flex-1 bg-slate-800" />
              <Skeleton className="h-10 flex-1 bg-slate-800" />
              <Skeleton className="h-10 flex-1 bg-slate-800" />
            </div>

            <Skeleton className="h-[300px] w-full bg-slate-800" />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
            <Skeleton className="h-6 w-[150px] mb-4 bg-slate-800" />
            <div className="space-y-4">
              <Skeleton className="h-20 w-full bg-slate-800" />
              <Skeleton className="h-20 w-full bg-slate-800" />
              <Skeleton className="h-20 w-full bg-slate-800" />
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
            <Skeleton className="h-6 w-[200px] mb-4 bg-slate-800" />
            <div className="space-y-4">
              <Skeleton className="h-24 w-full bg-slate-800" />
              <Skeleton className="h-24 w-full bg-slate-800" />
              <Skeleton className="h-24 w-full bg-slate-800" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
