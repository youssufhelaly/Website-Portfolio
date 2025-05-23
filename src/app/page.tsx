// src/app/page.tsx
import Hero from "@/components/Hero"
import About from "@/components/About"
import Timeline from "@/components/Exp-Edu"
import TechStack from "@/components/TechStack"
import Projects from "@/components/Projects"
import Footer from "@/components/Footer"

export default function Page() {
  return (
    <main>
      <Hero />
      {/* <About /> */}
      <Timeline />
      <TechStack />
      <Projects />
      <Footer />
    </main>
  )
}
