"use client"

import { Snowflake } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import dashboard from "@/data/dashboard.json"

export function Header() {
  const pathname = usePathname()
  const { labels } = dashboard

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Snowflake className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold tracking-tight">
              {labels.header.title}
            </span>
          </div>
          <nav className="flex gap-2">
            <Link 
              href="/warehouses"
              className={`text-sm font-medium px-4 py-2 rounded-[3px] transition-colors ${
                pathname.includes('/warehouses') 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-primary hover:bg-secondary/80"
              }`}
            >
              {labels.header.navigation.warehouses}
            </Link>
            <Link 
              href="/queries"
              className={`text-sm font-medium px-4 py-2 rounded-[3px] transition-colors ${
                pathname === '/queries'
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-primary hover:bg-secondary/80"
              }`}
            >
              {labels.header.navigation.queries}
            </Link>
          </nav>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}