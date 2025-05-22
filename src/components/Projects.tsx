"use client"
import { motion } from "framer-motion"

export default function Projects() {
  const projects = [
    {
      name: "Image Analysis Web App",
      tech: "React · Flask · AWS Rekognition",
      link: "https://github.com/youssufhelaly/image-analysis",
    },
    {
      name: "Slice Storm",
      tech: "Python · Pygame",
      link: "https://github.com/youssufhelaly/slice-storm",
    },
    // …add more here
  ]

  return (
    <section id="projects" className="relative px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-semibold mb-12 text-white border-b-2 border-cyan-500 inline-block"
      >
        Projects
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map(({ name, tech, link }) => (
          <motion.a
            key={name}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 bg-gray-800 rounded-2xl hover:scale-[1.02] transition"
          >
            <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
            <p className="text-gray-400">{tech}</p>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
