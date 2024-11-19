"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

interface DateRangePickerProps {
  defaultValue: string
}

export function DateRangePicker({ defaultValue }: DateRangePickerProps) {
  return (
    <Button 
      variant="outline" 
      className="bg-background flex items-center gap-2"
    >
      <Calendar className="h-4 w-4" />
      <span>{defaultValue}</span>
    </Button>
  )
}