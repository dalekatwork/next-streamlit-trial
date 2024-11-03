import warehouseData from "@/data/warehouse.json";
import Overview from "./Overview";
import OptimizationCard from "./OptimizationCard";
import WorkloadTable from "./WorkloadTable";
import TeamsTable from "./TeamsTable";

export default function WarehousePage() {
  return (
    <>
      <Overview data={warehouseData.overview} />

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Optimizations</h2>
        <div className="grid grid-cols-3 gap-4">
          {warehouseData.optimizations.map((opt, index) => (
            <OptimizationCard key={index} data={opt} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4">
        <WorkloadTable
          title={warehouseData.tables.title}
          headers={warehouseData.tables.headers}
          data={warehouseData.tables.data}
        />
        <TeamsTable
          title={warehouseData.teams.title}
          headers={warehouseData.teams.headers}
          data={warehouseData.teams.data}
        />
      </div>
    </>
  );
}
