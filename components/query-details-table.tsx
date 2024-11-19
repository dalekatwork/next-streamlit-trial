"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface QueryDetailsTableProps {
  query: {
    id: string
    duration: string
    rowsScanned: number
    partitionsScanned: number
    cost: number
    potentialSaving: number
    improvement: string[]
  }
}

export function QueryDetailsTable({ query }: QueryDetailsTableProps) {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Query Id</TableHead>
            <TableHead>Improvement</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Avg. Duration</TableHead>
            <TableHead className="text-right">Avg. Rows Scanned</TableHead>
            <TableHead className="text-right">Avg. Partition Scanned</TableHead>
            <TableHead className="text-right">Cost (USD)</TableHead>
            <TableHead className="text-right">Potential Saving (%)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">{query.id}</TableCell>
            <TableCell>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {query.improvement.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </TableCell>
            <TableCell>Looker Dashboard</TableCell>
            <TableCell>{query.duration}</TableCell>
            <TableCell className="text-right">{query.rowsScanned.toLocaleString()}</TableCell>
            <TableCell className="text-right">{query.partitionsScanned}</TableCell>
            <TableCell className="text-right">${query.cost}</TableCell>
            <TableCell className="text-right">{query.potentialSaving}%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}