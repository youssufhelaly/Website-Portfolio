// src/app/page.tsx
import Hero from "@/components/Hero"
import Timeline from "@/components/Timeline"
import ClientWrapper from "@/components/ClientWrapper"

export default function Page() {
  return (
    <main>
      <Hero />
      <Timeline />
      <ClientWrapper />
    </main>
  )
}
