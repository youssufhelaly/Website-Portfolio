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
      <body className="relative overflow-x-hidden font-sans bg-black text-white">
        {/* Background gradient layer */}
        <div className="fixed inset-0 -z-10 pointer-events-none bg-gradient-to-br from-black via-gray-900 to-black" />

        {/* Spotlight overlay */}
        <div
          className="fixed inset-0 -z-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(14, 116, 144, 0.3), transparent 55%)",
          }}
        />

        {/* Global components */}
        <Spotlight />
        <Navbar />

        {/* Page content */}
        <main className="relative z-10 min-h-screen scroll-snap-container">
          {children}
        </main>

        {/* Analytics outside of <main> */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
