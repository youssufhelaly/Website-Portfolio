"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiPostgresql,
  SiDocker,
  SiKubernetes,
  SiGit,
  SiJenkins,
  SiAmazon,
  SiReact,
  SiNextdotjs,
  SiFlask,
  SiSpringboot,
  SiC,
  SiHtml5,
  SiCss3,
  SiRedux,
  SiTensorflow,
  SiPytorch,
  SiNumpy,
  SiJira,
  SiJunit5,
  SiLinux,
  SiElasticsearch,
} from "react-icons/si"
import { FaJava } from "react-icons/fa"

const techCategories = [
  {
    category: "Languages",
    items: ["JavaScript", "Python", "SQL", "Java", "TypeScript", "C", "HTML", "CSS"],
  },
  {
    category: "Libraries/Frameworks",
    items: ["Spring Boot", "React", "Flask", "Redux", "TensorFlow", "PyTorch", "NumPy", "Next.js"],
  },
  {
    category: "Tools",
    items: [
      "Git",
      "Docker",
      "Kubernetes",
      "AWS",
      "Jenkins",
      "Jira",
      "JUnit",
      "Linux",
      "Elasticsearch",
      "PostgreSQL",
    ],
  },
]

// Map tech names to icons
const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Python: SiPython,
  SQL: SiPostgresql,
  Java: FaJava,
  C: SiC,
  HTML: SiHtml5,
  CSS: SiCss3,
  React: SiReact,
  "Next.js": SiNextdotjs,
  Flask: SiFlask,
  "Spring Boot": SiSpringboot,
  Redux: SiRedux,
  TensorFlow: SiTensorflow,
  PyTorch: SiPytorch,
  NumPy: SiNumpy,
  Git: SiGit,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  AWS: SiAmazon,
  Jenkins: SiJenkins,
  Jira: SiJira,
  JUnit: SiJunit5,
  Linux: SiLinux,
  Elasticsearch: SiElasticsearch,
  PostgreSQL: SiPostgresql,
}

export default function TechStack() {
  const marqueeVariants = {
    animate: (duration: number) => ({
      x: ["0%", "-50%"],
      transition: { duration, ease: "linear", repeat: Infinity }
    }),
    pause: { transition: { duration: 0 } }
  }

  return (
    <section
      id="tech-stack"
      className="relative py-10 md:py-12 px-4"
      style={{ paddingTop: 0, marginBottom: 0 }}
    >
      {/* Animated stroke heading */}
      <div className="relative z-10 max-w-3xl mx-auto text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          aria-hidden="true"
          className="flex items-center justify-center text-[6rem] font-extrabold text-transparent stroke-white/10 select-none pointer-events-none"
          style={{ WebkitTextStroke: "1px rgba(14, 116, 144, 0.5)" }}
        >
          Tech Stack
        </motion.h1>
      </div>

      <div className="max-w-3xl mx-auto space-y-2">
        {techCategories.map(({ category, items }) => {
          const duration = items.length * 3
          return (
            <div key={category} className="space-y-2">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex items-center justify-center text-[1.5rem] font-extrabold text-transparent stroke-white/10 select-none pointer-events-none"
                style={{ WebkitTextStroke: "1px rgba(14, 116, 144, 0.5)" }}
              >
                {category}
              </motion.h3>

              {/* Marquee using Framer Motion */}
              <div className="relative overflow-hidden marquee-container">
                <motion.div
                  className="flex whitespace-nowrap"
                  custom={duration}
                  variants={marqueeVariants}
                  animate="animate"
                  whileHover="pause"
                >
                  {[...items, ...items].map((tech, idx) => {
                    const Icon = iconMap[tech]
                    return (
                      <div key={`${tech}-${idx}`} className="inline-flex flex-col items-center mx-4">
                        {Icon && <Icon className="text-4xl text-white mb-1" />}
                        <span className="text-xs text-white/70">{tech}</span>
                      </div>
                    )
                  })}
                </motion.div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}