import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import './globals.css'

export const metadata: Metadata = {
  title: 'Warehouse Analytics Dashboard',
  description: 'Analytics dashboard for warehouse management and optimization',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}