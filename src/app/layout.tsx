// src/app/layout.tsx
import "./globals.css"
import Navbar from "@/components/Navbar"
import { Analytics } from "@vercel/analytics/next"
export const metadata = {
  title: "Youssuf Helaly Portfolio",
  description: "Software engineer portfolio website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative overflow-x-hidden font-sans">
        {/* Shared Gradient & Spotlight */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom right, #000000, #1a1a1a, #000000)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,255,255,0.15), transparent 55%)",
          }}
        />

        <Navbar />
        <main className="relative z-10">
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  )
}
