import { FiAward, FiBookOpen, FiBriefcase, FiMapPin } from "react-icons/fi"
import Reveal from "@/components/Reveal"
import SectionHeading from "@/components/SectionHeading"

const facts = [
  { icon: FiMapPin, label: "Ottawa, Canada" },
  { icon: FiBookOpen, label: "B.A.Sc. Software Engineering, 2027" },
  { icon: FiAward, label: "3.95 / 4.0 GPA" },
  { icon: FiBriefcase, label: "Currently consulting at ThinkRF" },
]

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 px-6 py-20 md:py-28">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <SectionHeading index="05" eyebrow="About" title="How I got here." />
        </Reveal>

        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr] md:gap-16">
          <Reveal delay={0.05}>
            <div className="space-y-5 text-base leading-relaxed text-zinc-400 md:text-lg">
              <p>
                I started shipping production code in my first year at the University of Ottawa
                and have not stopped since: test automation at Solink, full-stack telecom
                software at Nokia, cybersecurity simulation at Trend Micro, and now the ML
                platform behind a global RF sensor network at ThinkRF.
              </p>
              <p>
                I care about systems that survive contact with real load. Pipelines that ingest
                millions of records a day. Models that run on devices instead of in demos. Code
                that other engineers can build on without reading my mind.
              </p>
              <p className="text-zinc-300">
                I am at my best when handed a hard, ambiguous problem and the ownership to solve
                it end to end.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="space-y-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              {facts.map((fact) => (
                <li key={fact.label} className="flex items-center gap-3 text-sm text-zinc-300">
                  <fact.icon aria-hidden="true" className="h-4 w-4 shrink-0 text-cyan-200/80" />
                  {fact.label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
