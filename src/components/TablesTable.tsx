import React, { useState, useMemo } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import { TableData } from "@/types";
import Pagination from "./Pagination";

interface TablesTableProps {
  title: string;
  headers: Record<string, string>;
  data: TableData[];
}

const ITEMS_PER_PAGE = 5;

export default function TablesTable({
  title,
  headers,
  data,
}: TablesTableProps) {
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

  const sortedData = useMemo(() => {
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

  if (!data || data.length === 0) {
    return (
      <div className="bg-card rounded-[0.2rem] p-4 text-center text-gray-400">
        No table data available
      </div>
    );
  }

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
                <td className="py-4">{item.table}</td>
                <td>{item.attachedWorkloads}</td>
                <td>{item.queries.toLocaleString()}</td>
                <td>${item.cost.toLocaleString()}</td>
                <td>
                  <div className="w-20 bg-gray-700 rounded-[0.2rem] h-2">
                    <div
                      className="bg-green-500 h-2 rounded-[0.2rem]"
                      style={{ width: `${item.success * 100}%` }}
                    />
                  </div>
                </td>
                <td>
                  <div className="w-20 bg-gray-700 rounded-[0.2rem] h-2">
                    <div
                      className="bg-red-500 h-2 rounded-[0.2rem]"
                      style={{ width: `${item.failure * 100}%` }}
                    />
                  </div>
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
