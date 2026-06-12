import Image from "next/image"
import { FiArrowUpRight } from "react-icons/fi"
import Em from "@/components/Em"
import Reveal from "@/components/Reveal"
import SectionHeading from "@/components/SectionHeading"
import TechTag from "@/components/TechTag"

interface Role {
  company: string
  href: string
  logo: string
  logoClass?: string
  title: string
  period: string
  summary: string
  outcomes: string[]
  stack: string[]
}

const roles: Role[] = [
  {
    company: "ThinkRF",
    href: "https://www.thinkrf.com",
    logo: "/ThinkRF-logo.png",
    logoClass: "scale-125",
    title: "Cloud & ML Engineering Consultant",
    period: "2026 to Present",
    summary:
      "Architecting the machine learning platform behind a global radio frequency spectrum monitoring network.",
    outcomes: [
      "Architected a multi-model ML platform that processes **50M+ real-time RF observations** from **50+ sensors worldwide**, combining Isolation Forest and LSTM models for spectrum anomaly detection and classification.",
      "Engineered a high-throughput AWS data pipeline ingesting **10M+ records daily**, with automated CGI enrichment mapping cellular identities across **5 countries** in real time.",
      "Built an AI spectrum intelligence engine on **Claude** with structured prompt chaining that turns raw RF telemetry into root-cause reports, replacing **3+ hours of manual analysis every day**.",
    ],
    stack: ["Python", "AWS", "LSTM", "Isolation Forest", "Claude API"],
  },
  {
    company: "Trend Micro",
    href: "https://www.trendmicro.com",
    logo: "/trendmicro-logo.jpg",
    title: "Software Engineering Intern",
    period: "2025",
    summary:
      "Cybersecurity simulation at scale on a Go-based digital twin platform at a global security company.",
    outcomes: [
      "Led the design of an AI world generation system using **MCP** that autonomously creates **100+ realistic environments** with dynamic network topologies and embedded CVEs, cutting manual setup by **80%**.",
      "Independently built a real-time security event processor that converts raw logs into structured attack narratives with phase detection and impact scoring, handling **1,000+ events per attack**.",
      "Extended the digital twin platform with network and API improvements plus **Prometheus** monitoring, enabling **30% more complex simulations**.",
    ],
    stack: ["Go", "MCP", "Prometheus", "LLMs", "Cybersecurity"],
  },
  {
    company: "Nokia",
    href: "https://www.nokia.com",
    logo: "/nokia-logo.png",
    title: "Full-Stack Engineering Intern",
    period: "2025",
    summary: "Reliability and performance work across the stack of enterprise telecom software.",
    outcomes: [
      "Raised system reliability by **20%** by fixing service-layer defects and eliminating recurring Tomcat errors in Java Spring.",
      "Automated Elasticsearch index configuration, cutting data inconsistencies by **40%** and raising backend data quality.",
      "Rebuilt React workflows with Redux and tighter API integration, reducing page load times by roughly **25%**.",
      "Authored PostgreSQL migration scripts that preserved **100% data integrity** while accelerating database update cycles.",
    ],
    stack: ["Java", "Spring", "React", "Redux", "Elasticsearch", "PostgreSQL"],
  },
  {
    company: "Solink",
    href: "https://solink.com",
    logo: "/solink-logo.jpeg",
    title: "Software Engineering Intern",
    period: "2024",
    summary: "API development and test automation for a cloud video security platform.",
    outcomes: [
      "Developed Python RESTful APIs managing **20+ YAML-configured endpoints**, enabling rapid feature launches alongside frontend and product teams.",
      "Designed **50+ automated test cases** and automated their execution, cutting manual testing by **30%** and saving **$2,000+ per month**.",
      "Diagnosed and fixed CI/CD failures and flaky tests, reducing regression false positives across releases.",
    ],
    stack: ["Python", "Pytest", "Playwright", "REST APIs", "CI/CD"],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 px-6 py-20 md:py-28">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="Experience"
            title="Four companies. Production impact at each."
            sub="Not a list of responsibilities. These are the systems I designed, built, and shipped, and what they changed."
          />
        </Reveal>

        <div className="space-y-6">
          {roles.map((role, i) => (
            <Reveal key={role.company} delay={Math.min(i * 0.05, 0.15)}>
              <article className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors hover:border-white/[0.16] hover:bg-white/[0.03] md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white">
                      <Image
                        src={role.logo}
                        alt={`${role.company} logo`}
                        width={48}
                        height={48}
                        className={`h-full w-full object-contain p-1 ${role.logoClass ?? ""}`}
                      />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                        <a
                          href={role.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 transition-colors hover:text-cyan-200"
                        >
                          {role.company}
                          <FiArrowUpRight className="h-4 w-4 text-zinc-600 transition-colors group-hover:text-zinc-400" />
                        </a>
                      </h3>
                      <p className="text-sm font-medium text-zinc-400">{role.title}</p>
                    </div>
                  </div>
                  <p className="font-mono text-xs tracking-wide text-zinc-500">{role.period}</p>
                </div>

                <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-300">
                  {role.summary}
                </p>

                <ul className="mt-5 space-y-3">
                  {role.outcomes.map((outcome, j) => (
                    <li key={j} className="flex gap-3 text-[0.95rem] leading-relaxed text-zinc-400">
                      <span aria-hidden="true" className="mt-[0.62rem] h-1 w-1 shrink-0 rounded-full bg-cyan-300/70" />
                      <span>
                        <Em text={outcome} />
                      </span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {role.stack.map((tech) => (
                    <TechTag key={tech} label={tech} />
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Education */}
        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex items-center gap-4">
              <Image
                src="/uottawa-logo.jpg"
                alt="University of Ottawa logo"
                width={48}
                height={48}
                className="h-12 w-12 rounded-lg border border-white/10 bg-white object-contain p-1"
              />
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-white">
                  University of Ottawa
                </h3>
                <p className="text-sm text-zinc-400">
                  B.A.Sc. Software Engineering, 2023 to 2027
                </p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div>
                <p className="text-2xl font-semibold tracking-tight text-white tabular-nums">
                  3.95<span className="text-base text-zinc-500"> / 4.0</span>
                </p>
                <p className="text-xs text-zinc-500">Cumulative GPA</p>
              </div>
              <p className="hidden max-w-xs text-sm leading-relaxed text-zinc-500 lg:block">
                Data Structures and Algorithms, Operating Systems, Computer Architecture, Software
                Quality Assurance
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
