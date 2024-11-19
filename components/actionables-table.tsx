"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Actionable {
  warehouse: string
  utilization: number
  actions: string[]
  impacts: string[]
  savingPotential: number
}

interface ActionablesTableProps {
  data: Actionable[]
  labels: {
    columns: {
      warehouse: string
      utilization: string
      action: string
      impact: string
      savings: string
    }
  }
}

export function ActionablesTable({ data, labels }: ActionablesTableProps) {
  const { columns } = labels

  return (
    <div className="rounded-lg border bg-card/50">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{columns.warehouse}</TableHead>
            <TableHead>{columns.utilization}</TableHead>
            <TableHead>{columns.action}</TableHead>
            <TableHead>{columns.impact}</TableHead>
            <TableHead className="text-right">{columns.savings}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.warehouse}>
              <TableCell className="font-medium">{item.warehouse}</TableCell>
              <TableCell>{item.utilization}%</TableCell>
              <TableCell>
                <ol className="list-decimal list-inside space-y-1">
                  {item.actions.map((action, index) => (
                    <li key={index} className="text-sm">{action}</li>
                  ))}
                </ol>
              </TableCell>
              <TableCell>
                <ol className="list-decimal list-inside space-y-1">
                  {item.impacts.map((impact, index) => (
                    <li key={index} className="text-sm">{impact}</li>
                  ))}
                </ol>
              </TableCell>
              <TableCell className="text-right">${item.savingPotential.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}