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

interface TableUsageData {
  table: string
  workloads: number
  queries: number
  cost: number
  success: number
  failure: number
}

interface TableUsageTableProps {
  data: TableUsageData[]
  labels: {
    columns: {
      table: string
      workloads: string
      queries: string
      cost: string
      success: string
      failure: string
    }
  }
}

export function TableUsageTable({ data, labels }: TableUsageTableProps) {
  const { columns } = labels

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{columns.table}</TableHead>
            <TableHead className="text-right">{columns.workloads}</TableHead>
            <TableHead className="text-right">{columns.queries}</TableHead>
            <TableHead className="text-right">{columns.cost}</TableHead>
            <TableHead>
              <div className="flex justify-between">
                <span>{columns.success}</span>
                <span>{columns.failure}</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.table}>
              <TableCell className="font-medium">{item.table}</TableCell>
              <TableCell className="text-right">{item.workloads}</TableCell>
              <TableCell className="text-right">{item.queries.toLocaleString()}</TableCell>
              <TableCell className="text-right">${item.cost.toLocaleString()}</TableCell>
              <TableCell>
                <div className="space-y-2">
                  <Progress 
                    value={item.success} 
                    className="h-2 bg-secondary"
                    indicatorClassName={item.success >= 50 ? "bg-[rgb(16,185,129)]" : "bg-[rgb(244,63,94)]"}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{item.success}%</span>
                    <span>{item.failure}%</span>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}