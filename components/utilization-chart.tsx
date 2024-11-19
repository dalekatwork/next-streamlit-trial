"use client";

import { Card } from "@tremor/react";
import { BarChart } from "@tremor/react";
import { format, parseISO } from "date-fns";
import dashboard from "@/data/dashboard.json";

interface UtilizationData {
  date: string;
  analytics: number;
  marketplace: number;
  fulfillment: number;
  order: number;
}

interface UtilizationChartProps {
  data: UtilizationData[];
}

export function UtilizationChart({ data }: UtilizationChartProps) {
  const { labels } = dashboard;
  const formattedData = data.map((item) => ({
    date: format(parseISO(item.date), "MMM dd, yyyy"),
    [labels.warehouses.chart.warehouses.analytics]: item.analytics,
    [labels.warehouses.chart.warehouses.marketplace]: item.marketplace,
    [labels.warehouses.chart.warehouses.fulfillment]: item.fulfillment,
    [labels.warehouses.chart.warehouses.order]: item.order,
  }));

  const categories = [
    labels.warehouses.chart.warehouses.analytics,
    labels.warehouses.chart.warehouses.marketplace,
    labels.warehouses.chart.warehouses.fulfillment,
    labels.warehouses.chart.warehouses.order,
  ];

  return (
    <Card className="bg-card border-border">
      <BarChart
        className="h-72 mt-4"
        data={formattedData}
        index="date"
        categories={categories}
        colors={["indigo", "purple", "teal", "rose"]}
        valueFormatter={(value) => value.toString()}
        stack={true}
        showLegend={true}
        showGridLines={false}
        startEndOnly
        showYAxis={true}
        yAxisWidth={48}
      />
    </Card>
  );
}
