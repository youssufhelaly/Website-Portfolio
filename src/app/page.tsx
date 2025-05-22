// src/app/page.tsx
import Hero from "@/components/Hero"
import About from "@/components/About"
import Timeline from "@/components/Exp-Edu"
import Projects from "@/components/Projects"
import Divider from "@/components/Divider"
import TechStack from "@/components/TechStack"

export default function Page() {
  return (
    <>
      <Hero />
      <Divider/>
      <About />
       <Divider/>
      <Timeline /> 
       <Divider/>
      <TechStack />
      <Divider/>
      <Projects />
    </>
  )
}
