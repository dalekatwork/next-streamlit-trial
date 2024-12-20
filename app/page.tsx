"use client"

import Link from "next/link"
import { OverviewCard } from "@/components/overview-card"
import { OptimizationCard } from "@/components/optimization-card"
import { WorkloadTable } from "@/components/workload-table"
import { TeamTable } from "@/components/team-table"
import dashboard from "@/data/dashboard.json"
import type { CardVariant } from "@/types/dashboard"

export default function Home() {
  const { labels, data } = dashboard

  const overviewCards = [
    {
      href: "/warehouses/underutilized",
      title: labels.overview.warehouses.title,
      value: data.overview.warehouses,
      variant: labels.overview.warehouses.variant as CardVariant
    },
    {
      href: "/warehouses/underutilized",
      title: labels.overview.utilization.title,
      value: `${data.overview.utilization}%`,
      variant: labels.overview.utilization.variant as CardVariant
    },
    {
      href: undefined,
      title: labels.overview.totalCost.title,
      value: `$${data.overview.totalCost.toLocaleString()}`,
      variant: labels.overview.totalCost.variant as CardVariant
    },
    {
      href: undefined,
      title: labels.overview.savingPotential.title,
      value: `$${data.overview.savingPotential.toLocaleString()}`,
      variant: labels.overview.savingPotential.variant as CardVariant
    }
  ]

  return (
    <div className="container py-8 space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {overviewCards.map((card, index) => (
          card.href ? (
            <Link key={index} href={card.href}>
              <OverviewCard 
                title={card.title}
                value={card.value}
                variant={card.variant}
              />
            </Link>
          ) : (
            <OverviewCard 
              key={index}
              title={card.title}
              value={card.value}
              variant={card.variant}
            />
          )
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-6">{labels.optimizations.title}</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.optimizations.map((opt) => (
            <Link 
              key={opt.id} 
              href={opt.title === "Underutilized Warehouse" ? "/warehouses/underutilized" : "#"}
            >
              <OptimizationCard
                title={opt.title}
                severity={opt.severity as "Critical" | "Medium" | "Low"}
                actionables={opt.actionables}
                savingPotential={opt.savingPotential}
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{labels.tables.workloads.title}</h2>
          <WorkloadTable workloads={data.expensiveWorkloads} labels={labels.tables.workloads} />
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{labels.tables.teams.title}</h2>
          <TeamTable teams={data.expensiveTeams} labels={labels.tables.teams} />
        </div>
      </div>
    </div>
  )
}