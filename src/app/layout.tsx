import "./globals.css"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Navbar from "@/components/Navbar"
import { site, siteUrl } from "@/lib/site"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Youssuf Helaly | Software Engineer",
    template: "%s | Youssuf Helaly",
  },
  description: site.description,
  keywords: [
    "Youssuf Helaly",
    "Software Engineer",
    "Software Engineering Student",
    "University of Ottawa",
    "Cloud Engineering",
    "Machine Learning",
    "Backend Systems",
    "Trend Micro",
    "Nokia",
    "Solink",
    "ThinkRF",
  ],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Youssuf Helaly | Software Engineer",
    description: site.description,
    siteName: "Youssuf Helaly",
    images: [
      {
        url: "/profile.jpeg",
        width: 755,
        height: 844,
        alt: "Portrait of Youssuf Helaly",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Youssuf Helaly | Software Engineer",
    description: site.description,
    images: ["/profile.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: siteUrl,
  image: `${siteUrl}/profile.jpeg`,
  email: `mailto:${site.email}`,
  jobTitle: "Software Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Ottawa",
  },
  worksFor: {
    "@type": "Organization",
    name: "ThinkRF",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ottawa",
    addressCountry: "CA",
  },
  sameAs: [site.github, site.linkedin],
  knowsAbout: [
    "Cloud Engineering",
    "Machine Learning",
    "Backend Systems",
    "Distributed Systems",
    "Software Engineering",
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="overflow-x-hidden bg-[#09090b] font-sans text-zinc-200">
        {/* Single restrained ambient glow, fixed behind all content */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[640px]"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(34, 211, 238, 0.07), transparent 70%)",
          }}
        />
        <Navbar />
        {children}
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  )
}
