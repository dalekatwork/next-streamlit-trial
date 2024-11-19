"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface OverviewCardProps {
  title: string
  value: string | number
  variant?: "indigo" | "purple" | "teal" | "rose"
  className?: string
}

export function OverviewCard({ 
  title, 
  value, 
  variant = "indigo",
  className 
}: OverviewCardProps) {
  const variantStyles = {
    indigo: "bg-[rgb(49,46,129)] hover:bg-[rgb(49,46,129)]/90",
    purple: "bg-[rgb(88,28,135)] hover:bg-[rgb(88,28,135)]/90",
    teal: "bg-[rgb(19,78,74)] hover:bg-[rgb(19,78,74)]/90",
    rose: "bg-[rgb(136,19,55)] hover:bg-[rgb(136,19,55)]/90"
  }

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all hover:translate-y-[-2px] border-0",
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/[0.075] before:to-white/[0.035]",
      variantStyles[variant],
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white/70">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
      </CardContent>
    </Card>
  )
}