import Hero from "@/components/Hero"
import Divider from "@/components/Divider"
import About from "@/components/About"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Projects />
      <Divider />
      <Contact />
      <Footer />
    </>
  )
}
