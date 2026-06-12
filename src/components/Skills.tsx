import type { IconType } from "react-icons"
import { FiCloud, FiCpu, FiDatabase, FiLayout, FiServer } from "react-icons/fi"
import Reveal from "@/components/Reveal"
import SectionHeading from "@/components/SectionHeading"
import TechTag from "@/components/TechTag"

interface SkillGroup {
  title: string
  icon: IconType
  proof: string
  skills: string[]
}

const groups: SkillGroup[] = [
  {
    title: "Cloud & Infrastructure",
    icon: FiCloud,
    proof: "10M+ record daily pipelines at ThinkRF; simulation infrastructure at Trend Micro.",
    skills: ["AWS", "Docker", "Kubernetes", "Linux", "Prometheus", "CI/CD"],
  },
  {
    title: "Backend Engineering",
    icon: FiServer,
    proof: "Go services at Trend Micro, Java Spring at Nokia, Python APIs at Solink, Rust on side projects.",
    skills: ["Go", "Java", "Spring Boot", "Python", "Flask", "Rust", "REST APIs"],
  },
  {
    title: "AI & Machine Learning",
    icon: FiCpu,
    proof: "Anomaly detection models at ThinkRF; LLM-driven world generation at Trend Micro.",
    skills: ["TensorFlow", "PyTorch", "LSTM", "Isolation Forest", "Claude API", "MCP", "On-device inference"],
  },
  {
    title: "Frontend Development",
    icon: FiLayout,
    proof: "Enterprise React workflows at Nokia; cross-platform mobile with React Native.",
    skills: ["React", "Next.js", "TypeScript", "Redux", "React Native", "Tailwind CSS"],
  },
  {
    title: "Databases & Data Engineering",
    icon: FiDatabase,
    proof: "PostgreSQL migrations with 100% integrity at Nokia; Elasticsearch automation in production.",
    skills: ["PostgreSQL", "Elasticsearch", "Redis", "SQLite", "Firebase", "SQL"],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 px-6 py-20 md:py-28">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow="Skills"
            title="Depth where it counts."
            sub="Every group below is backed by production work, not a tutorial. The line under each one says where it was earned."
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          {groups.map((group, i) => (
            <Reveal
              key={group.title}
              delay={Math.min(i * 0.05, 0.2)}
              className={i === groups.length - 1 ? "md:col-span-2" : undefined}
            >
              <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors hover:border-white/[0.16] hover:bg-white/[0.03]">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-cyan-200">
                    <group.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-semibold tracking-tight text-white">
                    {group.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-500">{group.proof}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <TechTag key={skill} label={skill} />
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
