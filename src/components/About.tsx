// src/components/About.tsx
"use client"
import { motion } from "framer-motion"

export default function About() {
  return (
    <section id="about" className="relative min-h-screen overflow-hidden">
      {/* Cyan spotlight overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,255,255,0.1), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 text-white">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-semibold mb-8 border-b-2 border-cyan-500 inline-block"
        >
          About Me
        </motion.h2>

        {/* Single Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl leading-relaxed text-gray-300"
        >
          A full-stack engineer passionate about crafting seamless experiences
          from initial concept through to delivery. I thrive on turning ideas
          into intuitive, polished products and continually refining both
          functionality and usability to delight end users.
        </motion.p>
      </div>
    </section>
  )
}
