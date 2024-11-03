"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="space-x-4">
      <Link
        href="/warehouse"
        className={`px-4 py-2 rounded transition-colors ${
          pathname === "/warehouse" ? "bg-gray-800" : "hover:bg-gray-800/50"
        }`}
      >
        Warehouses
      </Link>
      <Link
        href="/queries"
        className={`px-4 py-2 rounded transition-colors ${
          pathname === "/queries" ? "bg-gray-800" : "hover:bg-gray-800/50"
        }`}
      >
        Queries
      </Link>
    </nav>
  );
}
