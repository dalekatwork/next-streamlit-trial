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
import type { Optimization, OptimizationLabels } from "@/types/optimizations"

interface OptimizationsTableProps {
  data: Optimization[];
  labels: OptimizationLabels;
}

export function OptimizationsTable({ data, labels }: OptimizationsTableProps) {
  const { columns, actions } = labels

  return (
    <div className="rounded-lg border bg-card/50">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{columns.pipeline}</TableHead>
            <TableHead>{columns.warehouse}</TableHead>
            <TableHead>{columns.action}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.pipeline}>
              <TableCell className="font-medium">{item.pipeline}</TableCell>
              <TableCell>{item.warehouse}</TableCell>
              <TableCell>
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="bg-indigo-500 text-white hover:bg-indigo-600"
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