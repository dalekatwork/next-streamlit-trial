"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import dashboard from "@/data/dashboard.json"

interface WorkloadTableProps {
  workloads: {
    workload: string
    type: string
    cost: number
    success: number
    failure: number
  }[]
  labels: {
    columns: {
      workload: string
      type: string
      cost: string
      successRate: string
    }
    successLabel: string
  }
}

export function WorkloadTable({ workloads, labels }: WorkloadTableProps) {
  const { columns } = labels
  const severityColors = dashboard.labels.optimizations.severity

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{columns.workload}</TableHead>
            <TableHead>{columns.type}</TableHead>
            <TableHead>{columns.cost}</TableHead>
            <TableHead>{columns.successRate}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workloads.map((workload) => (
            <TableRow key={workload.workload}>
              <TableCell className="font-medium">{workload.workload}</TableCell>
              <TableCell>{workload.type}</TableCell>
              <TableCell>${workload.cost.toLocaleString()}</TableCell>
              <TableCell>
                <div className="space-y-2">
                  <Progress 
                    value={workload.success} 
                    className="h-2 bg-secondary"
                    indicatorClassName={workload.success >= 50 ? 
                      `bg-[${severityColors.low.color}]` : 
                      `bg-[${severityColors.critical.color}]`
                    }
                  />
                  <span className="text-sm text-muted-foreground">
                    {workload.success}% {labels.successLabel}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}