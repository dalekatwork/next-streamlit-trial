"use client"

import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface QueryData {
  id: string
  query: string
  improvement: string[]
  source: string
  duration: string
  rowsScanned: number
  partitionsScanned: number
  cost: number
  potentialSaving: number
}

interface InefficientQueriesTableProps {
  data: QueryData[]
  labels: {
    columns: {
      id: string
      query: string
      improvement: string
      source: string
      duration: string
      rowsScanned: string
      partitionsScanned: string
      cost: string
      potentialSaving: string
    }
  }
}

export function InefficientQueriesTable({ data, labels }: InefficientQueriesTableProps) {
  const { columns } = labels

  return (
    <div className="rounded-lg border bg-card/50">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">{columns.id}</TableHead>
            <TableHead className="min-w-[300px]">{columns.query}</TableHead>
            <TableHead className="min-w-[200px]">{columns.improvement}</TableHead>
            <TableHead>{columns.source}</TableHead>
            <TableHead>{columns.duration}</TableHead>
            <TableHead className="text-right">{columns.rowsScanned}</TableHead>
            <TableHead className="text-right">{columns.partitionsScanned}</TableHead>
            <TableHead className="text-right">{columns.cost}</TableHead>
            <TableHead className="text-right">{columns.potentialSaving}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} className="cursor-pointer hover:bg-muted/50">
              <TableCell className="font-medium">
                <Link href={`/queries/inefficient/${item.id}`}>
                  {item.id}
                </Link>
              </TableCell>
              <TableCell className="font-mono text-xs">{item.query}</TableCell>
              <TableCell>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {item.improvement.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </TableCell>
              <TableCell>{item.source}</TableCell>
              <TableCell>{item.duration}</TableCell>
              <TableCell className="text-right">{item.rowsScanned.toLocaleString()}</TableCell>
              <TableCell className="text-right">{item.partitionsScanned}</TableCell>
              <TableCell className="text-right">${item.cost}</TableCell>
              <TableCell className="text-right">{item.potentialSaving}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}