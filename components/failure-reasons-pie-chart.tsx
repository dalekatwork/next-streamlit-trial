"use client"

import { DonutChart } from "@tremor/react"

interface FailureReason {
  name: string
  value: number
}

interface FailureReasonsPieChartProps {
  data: FailureReason[]
}

const valueFormatter = (number: number) => `${number.toFixed(1)}%`

export function FailureReasonsPieChart({ data }: FailureReasonsPieChartProps) {
  const customColors = [
    "rgb(129, 140, 248)",  // Indigo
    "rgb(244, 114, 182)",  // Pink
    "rgb(52, 211, 153)",   // Green
    "rgb(96, 165, 250)",   // Blue
    "rgb(167, 139, 250)",  // Purple
    "rgb(251, 191, 36)",   // Yellow
    "rgb(248, 113, 113)",  // Red
    "rgb(45, 212, 191)",   // Teal
    "rgb(251, 146, 60)",   // Orange
    "rgb(148, 163, 184)"   // Gray
  ]

  return (
    <div className="h-[300px]">
      <DonutChart
        data={data}
        category="value"
        index="name"
        valueFormatter={valueFormatter}
        colors={customColors}
        variant="pie"
        showAnimation={true}
        showTooltip={true}
        showLabel={false}
      />
      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-sm" 
              style={{ backgroundColor: customColors[index % customColors.length] }}
            />
            <span className="text-sm text-muted-foreground">
              {item.name} ({item.value}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}