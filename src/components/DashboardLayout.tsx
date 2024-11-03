"use client";

import { usePathname } from "next/navigation";
import WarehousePage from "./WarehousePage";
import QueriesPage from "./QueriesPage";
import Navigation from "./Navigation";
import DateRangePicker from "./DateRangePicker";

export default function DashboardLayout({
  initialPage,
}: {
  initialPage: "warehouses" | "queries";
}) {
  const pathname = usePathname();
  const currentPage = pathname === "/queries" ? "queries" : "warehouses";

  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    // Here you can handle the date range change, e.g., fetch new data
    console.log("Date range changed:", range);
  };

  return (
    <div className="min-h-screen text-white p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">SnowWise</h1>
        <div className="flex justify-between items-center mt-4">
          <Navigation />
          <DateRangePicker onRangeChange={handleDateRangeChange} />
        </div>
      </header>

      <main>
        {currentPage === "warehouses" ? <WarehousePage /> : <QueriesPage />}
      </main>
    </div>
  );
}
