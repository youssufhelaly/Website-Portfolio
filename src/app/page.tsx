// src/app/page.tsx
import Hero from "@/components/Hero"
import About from "@/components/About"
// ← remove Experience & Education imports
import Timeline from "@/components/Exp-Edu"
import Projects from "@/components/Projects"
import Divider from "@/components/Divider"

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Timeline /> 
      <Projects />
    </>
  )
}
