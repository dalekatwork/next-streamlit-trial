import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"], // Choose the subsets you'd like to include
  weight: ["400", "500", "600", "700"], // Optional: specify font weights
  variable: "--font-quicksand", // Optional: CSS variable for custom font
});

export const metadata: Metadata = {
  title: "Warehouse Analytics Dashboard",
  description: "Analytics dashboard for warehouse management and optimization",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${quicksand.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
