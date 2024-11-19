"use client";

import { format } from "date-fns";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { UtilizationChart } from "@/components/utilization-chart";
import { ActionablesTable } from "@/components/actionables-table";
import { OptimizationsTable } from "@/components/optimizations-table";
import { DateRangePicker } from "@/components/date-range-picker";
import dashboard from "@/data/dashboard.json";

export default function UnderutilizedWarehouses() {
  const { labels, data } = dashboard;

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <ChevronLeft className="h-4 w-4" />
            <Link href="/warehouses" className="text-sm">
              {labels.header.navigation.back}
            </Link>
          </div>
          <h1 className="text-2xl font-semibold">{labels.warehouses.title}</h1>
        </div>
        <DateRangePicker defaultValue={format(new Date(), "MMM dd, yyyy")} />
      </div>

      <div className="space-y-8">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">
            {labels.warehouses.chart.title}
          </h2>
          <UtilizationChart data={data.warehouses.utilization} />
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">
            {labels.warehouses.actionables.title}
          </h2>
          <ActionablesTable
            data={data.warehouses.actionables}
            labels={labels.warehouses.actionables}
          />
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {labels.warehouses.optimizations.title}
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{labels.warehouses.optimizations.affected}</span>
              <span className="font-medium text-foreground">
                {data.warehouses.optimizations.visualizations}{" "}
                {labels.warehouses.optimizations.visualizations}
              </span>
              <span>{labels.warehouses.optimizations.and}</span>
              <span className="font-medium text-foreground">
                {data.warehouses.optimizations.pipelines}{" "}
                {labels.warehouses.optimizations.pipelines}
              </span>
            </div>
          </div>
          <OptimizationsTable
            data={data.warehouses.optimizations.items}
            labels={labels.warehouses.optimizations}
          />
        </div>
      </div>
    </div>
  );
}
