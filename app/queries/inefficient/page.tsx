"use client"

import { format } from "date-fns"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { DateRangePicker } from "@/components/date-range-picker"
import { InefficientQueriesTable } from "@/components/inefficient-queries-table"
import dashboard from "@/data/dashboard.json"

export default function InefficientQueries() {
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
          <h1 className="text-2xl font-semibold">Inefficient Queries</h1>
        </div>
        <DateRangePicker 
          defaultValue={format(new Date(), "MMM dd, yyyy")}
        />
      </div>

      <div className="space-y-8">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Optimizations</h2>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>Affected Workloads:</span>
                <span className="font-medium text-foreground">
                  13 Visualizations
                </span>
                <span>and</span>
                <span className="font-medium text-foreground">
                  9 Pipelines
                </span>
              </div>
            </div>
          </div>
          <InefficientQueriesTable data={data.queries.inefficient} labels={labels.queries.inefficient} />
        </div>
      </div>
    </div>
  )
}