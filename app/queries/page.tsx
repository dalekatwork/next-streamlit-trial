"use client"

import Link from "next/link"
import { QueryOptimizationCard } from "@/components/query-optimization-card"
import { TableUsageTable } from "@/components/table-usage-table"
import { TeamCostTable } from "@/components/team-cost-table"
import { OverviewCard } from "@/components/overview-card"
import dashboard from "@/data/dashboard.json"
import { CardVariant, SeverityType } from "@/types/dashboard"

export default function Queries() {
  const { labels, data } = dashboard

  const overviewCards = [
    {
      href: undefined,
      title: labels.queries.overview.totalQueries,
      value: data.queries.overview.totalQueries.toLocaleString(),
      variant: "indigo" as CardVariant
    },
    {
      href: undefined,
      title: labels.queries.overview.avgQueueTime,
      value: data.queries.overview.avgQueueTime,
      variant: "purple" as CardVariant
    },
    {
      href: "/queries/failures",
      title: labels.queries.overview.failures,
      value: data.queries.overview.failures.toLocaleString(),
      variant: "teal" as CardVariant
    },
    {
      href: undefined,
      title: labels.queries.overview.savingPotential,
      value: `$${data.queries.overview.savingPotential.toLocaleString()}`,
      variant: "rose" as CardVariant
    }
  ]

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-6">{labels.queries.overview.title}</h2>
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
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-6">{labels.queries.optimizations.title}</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.queries.optimizations.map((opt) => (
            <Link 
              key={opt.id} 
              href={
                opt.title === "Recurring Expensive Failures" ? "/queries/failures" :
                opt.title === "Inefficient Queries" ? "/queries/inefficient" : "#"
              }
            >
              <QueryOptimizationCard
                title={opt.title}
                severity={opt.severity as SeverityType}
                actionables={opt.actionables}
                savingPotential={opt.savingPotential}
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{labels.queries.tables.title}</h2>
          <TableUsageTable data={data.queries.tables} labels={labels.queries.tables} />
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{labels.queries.teams.title}</h2>
          <TeamCostTable data={data.queries.teams} labels={labels.queries.teams} />
        </div>
      </div>
    </div>
  )
}