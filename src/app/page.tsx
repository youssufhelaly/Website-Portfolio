import Hero from "@/components/Hero"
import Experience from "@/components/Experience"
import Projects from "@/components/Projects"
import Skills from "@/components/Skills"
import Testimonials from "@/components/Testimonials"
import About from "@/components/About"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function Page() {
  return (
    <>
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
