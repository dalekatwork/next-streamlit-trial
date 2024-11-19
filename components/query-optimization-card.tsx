"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import dashboard from "@/data/dashboard.json"

interface QueryOptimizationCardProps {
  title: string
  severity: "Critical" | "Medium" | "Low"
  actionables: number
  savingPotential: number
}

export function QueryOptimizationCard({ 
  title, 
  severity, 
  actionables, 
  savingPotential 
}: QueryOptimizationCardProps) {
  const severityKey = severity.toLowerCase() as keyof typeof dashboard.labels.optimizations.severity
  const severityData = dashboard.labels.optimizations.severity[severityKey]
  const { metrics } = dashboard.labels.optimizations

  return (
    <Card className="relative overflow-hidden transition-all hover:translate-y-[-2px] before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/[0.02] before:to-primary/[0.05] dark:before:from-primary/[0.05] dark:before:to-primary/[0.08]">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <span 
            className="text-xs font-bold px-3 py-1.5 rounded-[3px] text-white"
            style={{ backgroundColor: severityData.color }}
          >
            {severityData.label}
          </span>
        </div>
        <CardTitle className="text-lg mt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{metrics.actionables}</p>
            <p className="text-2xl font-bold">{actionables}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{metrics.savingPotential}</p>
            <p className="text-2xl font-bold">${savingPotential.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}