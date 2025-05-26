import "./globals.css"
import Navbar from "@/components/Navbar"
import Spotlight from "@/components/Spotlight"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: "Youssuf Helaly Portfolio",
  description: "Software engineer portfolio website",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative overflow-x-hidden font-sans">
        {/* Shared Gradient overlay */}
        <div
          className="fixed inset-0 pointer-events-none bg-gradient-to-br from-black via-gray-900 to-black"
        />
        {/* Global Spotlight */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(14, 116, 144, 0.3), transparent 55%)",
          }}
        />
        <Spotlight />
        <Navbar />
        <main className="relative z-10 scroll-snap-container">
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}