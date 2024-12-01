"use client"

import { BarChart } from "@tremor/react"
import { format, parseISO } from "date-fns"
import dashboard from "@/data/dashboard.json"

interface ExecutionData {
  date: string
  order: number
  marketplace: number
  analytics: number
  fulfillment: number
}

interface QueryExecutionsChartProps {
  data: ExecutionData[]
}

export function QueryExecutionsChart({ data }: QueryExecutionsChartProps) {
  const { labels } = dashboard
  const formattedData = data.map(item => ({
    date: format(parseISO(item.date), "MMM dd, yyyy"),
    [labels.warehouses.chart.warehouses.order]: item.order,
    [labels.warehouses.chart.warehouses.marketplace]: item.marketplace,
    [labels.warehouses.chart.warehouses.analytics]: item.analytics,
    [labels.warehouses.chart.warehouses.fulfillment]: item.fulfillment
  }))

  return (
    <div className="space-y-4">
      <div className="flex gap-6">
        {Object.entries(labels.warehouses.chart.warehouses).map(([key, name]) => (
          <div key={key} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-sm" 
              style={{ 
                backgroundColor: key === 'order' ? '#A78BFA' :
                               key === 'marketplace' ? '#EC4899' :
                               key === 'analytics' ? '#86EFAC' :
                               '#93C5FD'
              }} 
            />
            <span className="text-sm text-muted-foreground">{name}</span>
          </div>
        ))}
      </div>
      <BarChart
        className="h-72"
        data={formattedData}
        index="date"
        categories={[
          labels.warehouses.chart.warehouses.order,
          labels.warehouses.chart.warehouses.marketplace,
          labels.warehouses.chart.warehouses.analytics,
          labels.warehouses.chart.warehouses.fulfillment
        ]}
        colors={[
          "#A78BFA",  // Purple
          "#EC4899",  // Pink
          "#86EFAC",  // Light green
          "#93C5FD"   // Light blue
        ]}
        stack
        showLegend={false}
        showGridLines={false}
        startEndOnly
        showYAxis={false}
        yAxisWidth={48}
      />
    </div>
  )
}