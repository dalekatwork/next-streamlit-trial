"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface TeamTableProps {
  teams: {
    team: string
    cost: number
  }[]
  labels: {
    columns: {
      team: string
      cost: string
    }
  }
}

export function TeamTable({ teams, labels }: TeamTableProps) {
  const { columns } = labels

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{columns.team}</TableHead>
            <TableHead>{columns.cost}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((team) => (
            <TableRow key={team.team}>
              <TableCell className="font-medium">{team.team}</TableCell>
              <TableCell>${team.cost.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}