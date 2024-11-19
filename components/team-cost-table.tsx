"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface TeamCostData {
  team: string
  cost: number
}

interface TeamCostTableProps {
  data: TeamCostData[]
  labels: {
    columns: {
      team: string
      cost: string
    }
  }
}

export function TeamCostTable({ data, labels }: TeamCostTableProps) {
  const { columns } = labels

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{columns.team}</TableHead>
            <TableHead className="text-right">{columns.cost}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.team}>
              <TableCell className="font-medium">{item.team}</TableCell>
              <TableCell className="text-right">${item.cost.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}