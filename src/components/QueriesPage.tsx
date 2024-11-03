import queriesData from "@/data/queries.json";
import Overview from "./Overview";
import OptimizationCard from "./OptimizationCard";
import TablesTable from "./TablesTable";
import TeamsTable from "./TeamsTable";

export default function QueriesPage() {
  return (
    <>
      <Overview data={queriesData.overview} />

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Optimizations</h2>
        <div className="grid grid-cols-3 gap-4">
          {queriesData.optimizations.map((opt, index) => (
            <OptimizationCard key={index} data={opt} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4">
        <TablesTable
          title={queriesData.tables.title}
          headers={queriesData.tables.headers}
          data={queriesData.tables.data}
        />
        <TeamsTable
          title={queriesData.teams.title}
          headers={queriesData.teams.headers}
          data={queriesData.teams.data}
        />
      </div>
    </>
  );
}
