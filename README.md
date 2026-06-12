# Youssuf Helaly | Portfolio

Personal portfolio of Youssuf Helaly, software engineering student at the University of Ottawa. Experience at Trend Micro, Nokia, Solink, and ThinkRF across cloud engineering, AI/ML, and backend systems.

## Stack

- Next.js (App Router) with React Server Components
- TypeScript
- Tailwind CSS v4
- Geist Sans and Geist Mono via `next/font`
- Framer Motion for scroll reveals, gated behind `prefers-reduced-motion`
- JSON-LD structured data, Open Graph metadata, sitemap, and robots

## Architecture notes

- Sections are server components; client JavaScript is limited to the navbar and a small `Reveal` animation wrapper.
- Resume bullet emphasis is rendered through a structured `Em` component instead of HTML-in-strings.
- Single accent color, hairline borders, and a fixed type scale keep the design system consistent.

## Development

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build
```

Set `NEXT_PUBLIC_SITE_URL` to the production domain for canonical URLs (falls back to the Vercel deployment URL).
