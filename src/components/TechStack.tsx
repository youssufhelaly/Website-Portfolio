"use client"
import React from "react"
import { motion } from "framer-motion"
import {
  SiJavascript, SiTypescript, SiPython, SiPostgresql,
  SiDocker, SiKubernetes, SiGit, SiJenkins, SiAmazon,
  SiReact, SiNextdotjs, SiFlask, SiSpringboot, SiC,
  SiHtml5, SiCss3, SiRedux, SiTensorflow, SiPytorch, SiNumpy,
  SiJira, SiJunit5, SiLinux, SiElasticsearch
} from "react-icons/si"
import { FaJava } from "react-icons/fa"

const techCategories = [
  { category: "Languages", items: ["JavaScript", "Python", "SQL", "Java", "TypeScript", "C", "HTML", "CSS"] },
  { category: "Libraries/Frameworks", items: ["Spring Boot", "React", "Flask", "Redux", "TensorFlow", "PyTorch", "NumPy", "Next.js"] },
  { category: "Tools", items: ["Git", "Docker", "Kubernetes", "AWS", "Jenkins", "Jira", "JUnit", "Linux", "Elasticsearch", "PostgreSQL"] },
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
  "Linux": SiLinux,
  Elasticsearch: SiElasticsearch,
  PostgreSQL: SiPostgresql,
}

export default function TechStack() {
  return (
    <section id="tech-stack" className="relative py-20 px-4">
        <div className="relative z-10 max-w-3xl mx-auto px-1 py-5 text-white">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-semibold mb-5 border-b-2 border-cyan-700 inline-block "

      >
        Tech Stack
      </motion.h2>
        </div>      
      <div className="space-y-5 max-w-3xl mx-auto">
        {techCategories.map(({ category, items }) => {
          const duration = items.length * 3 
          return (
            <div key={category} className="space-y-">
              <h3 className="text-xl font-semibold text-white text-center"></h3>

              {/* CSS Marquee */}
              <div className="marquee-container overflow-hidden relative mx-auto w-full">
                <div
                  className="marquee-content flex items-center whitespace-nowrap"
                  style={{ animationDuration: `${duration}s` }}
                >
                  {[...items, ...items].map((tech, idx) => {
                    const Icon = iconMap[tech]
                    return (
                      <div key={idx} className="inline-flex flex-col items-center mx-4">
                        {Icon && <Icon className="text-5xl text-white mb-1" />}
                        <span className="text-sm text-cyan-600">{tech}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}