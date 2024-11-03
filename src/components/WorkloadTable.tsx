import React, { useState } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import Pagination from "./Pagination";

interface WorkloadData {
  workload: string;
  type: string;
  cost: number;
}

interface WorkloadTableProps {
  title: string;
  headers: Record<string, string>;
  data: WorkloadData[];
}

const ITEMS_PER_PAGE = 5;

export default function WorkloadTable({
  title,
  headers,
  data,
}: WorkloadTableProps) {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortField) return data;

    return [...data].sort((a: any, b: any) => {
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="bg-card rounded-[0.2rem] p-6">
      <h2 className="text-white text-xl mb-6">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 text-left">
              {Object.entries(headers).map(([key, label]) => (
                <th
                  key={key}
                  className="py-2 cursor-pointer hover:text-white transition-colors text-sm font-normal"
                  onClick={() => handleSort(key)}
                >
                  <div className="flex items-center gap-1">
                    {label}
                    {sortField === key &&
                      (sortDirection === "asc" ? (
                        <ArrowUpIcon className="h-4 w-4" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4" />
                      ))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr
                key={index}
                className="text-white border-t border-gray-800 hover:bg-gray-800/50 transition-all"
              >
                <td className="py-4">{item.workload}</td>
                <td>{item.type}</td>
                <td>${item.cost.toLocaleString()}</td>
                <td>
                  <div className="w-20 bg-green-500 h-2 rounded-[0.2rem]"></div>
                </td>
                <td>
                  <div className="w-20 bg-red-500 h-2 rounded-[0.2rem]"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-gray-800">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
