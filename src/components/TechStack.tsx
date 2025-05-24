"use client"
import React from "react"
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
    <section id="tech-stack" className="relative py-10 md:py-12 px-4" style={{paddingTop: "0px", marginBottom: "0px"}}>
      {/* Hidden stroke heading */}
      <div className="relative z-10 max-w-3xl mx-auto px-1 text-white">
        <h1
          aria-hidden="true"
          className="flex items-center justify-center text-[6rem] font-extrabold text-transparent stroke-white/10 select-none pointer-events-none"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
        >
          Tech Stack
        </h1>
      </div>
      <div className="space-y-8 max-w-3xl mx-auto">
        {techCategories.map(({items }) => {
          const duration = items.length * 3
          return (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-cyan-300 text-center uppercase tracking-wide">
              </h3>
              <div className="marquee-container overflow-hidden relative">
                <div
                  className="marquee-content flex items-center whitespace-nowrap"
                  style={{ animationDuration: `${duration}s` }}
                >
                  {[...items, ...items].map((tech, idx) => {
                    const Icon = iconMap[tech]
                    return (
                      <div key={idx} className="inline-flex flex-col items-center mx-4">
                        {Icon && <Icon className="text-4xl text-white mb-1" />}
                        <span className="text-xs text-white/70">{tech}</span>
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