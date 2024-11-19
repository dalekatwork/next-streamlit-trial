import { format } from "date-fns"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DateRangePicker } from "@/components/date-range-picker"
import { QueryDetailsTable } from "@/components/query-details-table"
import dashboard from "@/data/dashboard.json"

interface QueryDetailsPageProps {
  params: {
    id: string
  }
}

// Generate static params for all possible query IDs
export function generateStaticParams() {
  return dashboard.data.queries.inefficient.map((query) => ({
    id: query.id,
  }))
}

export default function QueryDetails({ params }: QueryDetailsPageProps) {
  const query = dashboard.data.queries.inefficient.find(q => q.id === params.id)
  
  if (!query) {
    return null
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ChevronLeft className="h-4 w-4" />
            <div className="flex items-center gap-1 text-sm">
              <Link href="/queries" className="hover:text-primary">
                Queries
              </Link>
              <span>/</span>
              <Link href="/queries/inefficient" className="hover:text-primary">
                Inefficient Queries
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Query ID: {query.id}</h1>
            <div className="text-sm text-muted-foreground">
              Source: Product sales insights
            </div>
          </div>
        </div>
        <DateRangePicker 
          defaultValue={format(new Date(), "MMM dd, yyyy")}
        />
      </div>

      <QueryDetailsTable query={query} />

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Original Query</h2>
          <div className="rounded-lg border bg-card p-6">
            <pre className="text-sm font-mono whitespace-pre-wrap overflow-x-auto">
              {query.query}
            </pre>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Optimizations</h2>
          <div className="rounded-lg border bg-card p-6">
            <pre className="text-sm font-mono whitespace-pre-wrap overflow-x-auto">
              {`SELECT
  c.customer_id, c.customer_name,
  COUNT(o.order_id) AS total_orders,
  COALESCE(SUM(op.quantity * p.price), 0) AS total_spent
FROM
  customers c
  LEFT JOIN orders o ON c.customer_id = o.customer_id
  LEFT JOIN orders_products op ON o.order_id = op.order_id
  LEFT JOIN products p ON op.product_id = p.product_id
GROUP BY c.customer_id, c.customer_name;`}
            </pre>
          </div>

          <div className="rounded-lg border bg-card p-6 space-y-6">
            <h3 className="font-semibold">Warehouse Changes</h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <span className="text-sm">1. Apply cluster key on table:</span>
                <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">customer</code>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-sm">2. Enable</span>
                <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">micro-partitioning</code>
                <span className="text-sm">on table:</span>
                <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">customer</code>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-sm">3. Cluster key for table:</span>
                <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">customer_name</code>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-sm">4. Enable</span>
                <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">micro-partitioning</code>
                <span className="text-sm">on table:</span>
                <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">orders</code>
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 space-y-4">
            <h3 className="font-semibold">Apply</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Fulfillment Ware House</span>
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="bg-indigo-500 text-white hover:bg-indigo-600"
                >
                  Open PR
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Query ID: 963852</span>
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="bg-indigo-500 text-white hover:bg-indigo-600"
                >
                  Open PR
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}