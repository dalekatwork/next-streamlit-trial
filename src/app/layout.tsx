import "./globals.css";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import Script from "next/script";

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "SnowWise Dashboard",
  description: "Data warehouse analytics dashboard",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={quicksand.className}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <style global>{`
          :root {
            --font-quicksand: ${quicksand.style.fontFamily};
          }

          html {
            font-family: ${quicksand.style.fontFamily}, sans-serif;
          }

          body {
            font-family: ${quicksand.style.fontFamily}, sans-serif;
            font-size: 13px;
          }

          * {
            font-family: inherit;
          }
        `}</style>
        <Script id="performance-optimizations" strategy="beforeInteractive">
          {`
            // Disable console warnings in production
            if (process.env.NODE_ENV === 'production') {
              console.warn = () => {};
            }

            // Optimize performance
            document.documentElement.style.visibility = 'visible';

            // Handle routing
            (function() {
              let isNavigating = false;
              const pageCache = new Map();

              function handleNavigation(path) {
                if (isNavigating) return;
                isNavigating = true;

                // Update URL without reload
                window.history.pushState({}, '', path);

                // Dispatch route change event
                window.dispatchEvent(
                  new CustomEvent('routeChange', { detail: { path } })
                );

                // Reset navigation lock
                setTimeout(() => {
                  isNavigating = false;
                }, 5000);
              }

              window.addEventListener('load', function() {
                // Handle link clicks
                document.addEventListener('click', function(e) {
                  const link = e.target.closest('a');
                  if (link?.href?.startsWith(window.location.origin)) {
                    e.preventDefault();
                    const path = link.href.replace(window.location.origin, '');
                    handleNavigation(path);
                  }
                });

                // Handle back/forward
                window.addEventListener('popstate', function() {
                  if (!isNavigating) {
                    handleNavigation(window.location.pathname);
                  }
                });
              });
            })();
          `}
        </Script>
      </head>
      <body className="h-full bg-background text-white overflow-hidden">
        {children}
      </body>
    </html>
  );
}
