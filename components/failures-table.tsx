"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { type FailureItem, type FailureLabels } from "@/types/failures"

interface FailuresTableProps {
  data: FailureItem[];
  labels: FailureLabels;
}

export function FailuresTable({ data, labels }: FailuresTableProps) {
  const { columns, actions } = labels

  return (
    <div className="rounded-lg border bg-card/50">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{columns.source}</TableHead>
            <TableHead>{columns.reason}</TableHead>
            <TableHead className="text-right">{columns.occurrences}</TableHead>
            <TableHead>{columns.type}</TableHead>
            <TableHead className="text-right">{columns.cost}</TableHead>
            <TableHead>{columns.action}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.source}>
              <TableCell className="font-medium">{item.source}</TableCell>
              <TableCell>{item.reason}</TableCell>
              <TableCell className="text-right">{item.occurrences}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell className="text-right">${item.cost}</TableCell>
              <TableCell>
                <Button 
                  variant="secondary" 
                  size="sm"
                  className={
                    item.action === "fix" 
                      ? "bg-[rgb(16,185,129)] text-white hover:bg-[rgb(16,185,129)]/90"
                      : "bg-indigo-500 text-white hover:bg-indigo-600"
                  }
                >
                  {actions[item.action]}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}