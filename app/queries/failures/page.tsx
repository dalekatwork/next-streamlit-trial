"use client"

import { format } from "date-fns"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { QueryExecutionsChart } from "@/components/query-executions-chart"
import { FailuresTable } from "@/components/failures-table"
import { FailureReasonsPieChart } from "@/components/failure-reasons-pie-chart"
import { FailureSourcesPieChart } from "@/components/failure-sources-pie-chart"
import { DateRangePicker } from "@/components/date-range-picker"
import dashboard from "@/data/dashboard.json"

export default function RecurringExpensiveFailures() {
  const { labels, data } = dashboard

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <ChevronLeft className="h-4 w-4" />
            <Link href="/queries" className="text-sm">
              Queries
            </Link>
          </div>
          <h1 className="text-2xl font-semibold">Recurring Expensive Failures</h1>
        </div>
        <DateRangePicker 
          defaultValue={format(new Date(), "MMM dd, yyyy")}
        />
      </div>

      <div className="space-y-8">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Query Executions</h2>
          <QueryExecutionsChart data={data.queries.failures.executions} />
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Fix Frequent Failures</h2>
          <FailuresTable 
            data={data.queries.failures.items} 
            labels={labels.queries.failures}
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Top Failure Reasons</h2>
            <FailureReasonsPieChart data={data.queries.failures.reasons} />
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Top Failure Sources</h2>
            <FailureSourcesPieChart data={data.queries.failures.sources} />
          </div>
        </div>
      </div>
    </div>
  )
}