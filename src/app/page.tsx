
import Hero from "@/components/Hero"
import Timeline from "@/components/Timeline"
import TechStack from "@/components/TechStack"
import Projects from "@/components/Projects"
import Footer from "@/components/Footer"
import Testimonials from "@/components/Testimonials"

export default function Page() {
  return (
    <main className="scroll-snap-container space-y-8 md:space-y-12">
      <Hero />
      {/* <About /> */}
      <Timeline />
      <TechStack />
      <Projects />
      <Testimonials/>
      <Footer />
    </main>
  )
}
