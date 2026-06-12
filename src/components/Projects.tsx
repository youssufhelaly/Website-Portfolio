import Image from "next/image"
import { FiArrowUpRight, FiGithub, FiLock } from "react-icons/fi"
import Em from "@/components/Em"
import Reveal from "@/components/Reveal"
import SectionHeading from "@/components/SectionHeading"
import TechTag from "@/components/TechTag"

interface FeaturedProject {
  name: string
  tagline: string
  problem: string
  highlights: string[]
  stack: string[]
  image: string
  imageAlt: string
  imageClassName?: string
  github?: string
}

interface SmallProject {
  name: string
  description: string
  stack: string[]
  github?: string
}

const featured: FeaturedProject[] = [
  {
    name: "ClipIt",
    tagline: "Real-time ML video intelligence, entirely on device",
    problem:
      "Finding the moment that matters in long footage means scrubbing manually. ClipIt detects highlight-worthy moments as they happen, on the phone, with no cloud round trip.",
    highlights: [
      "Three-tier ML pipeline built on YAMNet and contextual models, reaching **sub-500ms latency** at **85% detection confidence** on live video.",
      "On-device inference with TensorFlow.js and WebGL acceleration; memory-efficient TypedArrays sustain **30+ second rolling buffers with zero memory leaks**.",
      "High-throughput Rust backend on Actix-Web and FFmpeg that processes **concurrent 50MB uploads** into stitched, optimized clips.",
    ],
    stack: ["React Native", "TypeScript", "Rust", "TensorFlow", "Firebase"],
    image: "/ClipIt.jpg",
    imageAlt: "ClipIt app icon, a camera lens framed by code brackets and audio waveforms",
  },
  {
    name: "Image Analysis Platform",
    tagline: "Computer vision search over thousands of images",
    problem:
      "Bulk image libraries are unsearchable without tags. This platform runs AWS Rekognition over every upload and makes whole collections queryable by object in seconds.",
    highlights: [
      "React and Flask application backed by **AWS Rekognition and S3**, improving search efficiency by **40%**.",
      "Handles authentication, bulk uploads, and object-count filtering, processing **500+ images in seconds**.",
      "Optimized SQLite queries to cut processing redundancy and keep response times flat as collections grow.",
    ],
    stack: ["React", "Flask", "AWS Rekognition", "S3", "SQLite"],
    image: "/Image_Analysis.png",
    imageAlt: "Image Analysis web interface with drag-and-drop upload and object search",
    imageClassName: "scale-[1.03] object-top",
    github: "https://github.com/youssufhelaly/Image-Analysis-Web-Application",
  },
]

const more: SmallProject[] = [
  {
    name: "Event Attendance Manager",
    description:
      "Android app with role-based access for attendees, organizers, and administrators, backed by Firebase real-time sync.",
    stack: ["Java", "Android", "Firebase", "SQLite"],
    github: "https://github.com/uOttawaSEG/project-group-24",
  },
  {
    name: "Friend Recommender",
    description:
      "Graph-based recommendation engine built on adjacency lists and common-connection scoring across social network data.",
    stack: ["Python", "Graph Algorithms"],
    github: "https://github.com/youssufhelaly/Social_Network_code",
  },
  {
    name: "Slice Storm",
    description:
      "2D arcade slicing game with dynamic difficulty scaling, full pause systems, and object-oriented architecture.",
    stack: ["Python", "Pygame"],
    github: "https://github.com/youssufhelaly/Slice-Storm-Game",
  },
  {
    name: "This Portfolio",
    description:
      "The site you are reading. Next.js App Router, Tailwind CSS v4, server components, and structured data for SEO.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/youssufhelaly/Website-Portfolio",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 px-6 py-20 md:py-28">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="Projects"
            title="Products, not assignments."
            sub="Side projects I designed and built end to end, from ML pipelines to the backends that serve them."
          />
        </Reveal>

        <div className="space-y-16 md:space-y-20">
          {featured.map((project, i) => (
            <Reveal key={project.name}>
              <article className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
                {/* Visual */}
                <div className={i % 2 === 1 ? "md:order-2" : undefined}>
                  <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-900">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 480px"
                        className={`object-cover ${project.imageClassName ?? ""}`}
                      />
                    </div>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06]"
                    />
                  </div>
                </div>

                {/* Case study */}
                <div className={i % 2 === 1 ? "md:order-1" : undefined}>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-semibold tracking-tight text-white">
                      {project.name}
                    </h3>
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
                      >
                        <FiGithub className="h-3.5 w-3.5" />
                        Source
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-zinc-500">
                        <FiLock className="h-3 w-3" />
                        Private build
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-medium text-cyan-200/80">{project.tagline}</p>

                  <p className="mt-4 text-[0.95rem] leading-relaxed text-zinc-400">
                    {project.problem}
                  </p>

                  <ul className="mt-5 space-y-3">
                    {project.highlights.map((highlight, j) => (
                      <li
                        key={j}
                        className="flex gap-3 text-[0.95rem] leading-relaxed text-zinc-400"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.62rem] h-1 w-1 shrink-0 rounded-full bg-cyan-300/70"
                        />
                        <span>
                          <Em text={highlight} />
                        </span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <TechTag key={tech} label={tech} />
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Secondary projects */}
        <Reveal>
          <h3 className="mb-6 mt-20 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
            More projects
          </h3>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {more.map((project, i) => {
            const inner = (
              <>
                <div className="flex items-start justify-between gap-4">
                  <h4 className="text-base font-semibold tracking-tight text-white">
                    {project.name}
                  </h4>
                  {project.github && (
                    <FiArrowUpRight className="h-4 w-4 shrink-0 text-zinc-600 transition-colors group-hover:text-cyan-200" />
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{project.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <TechTag key={tech} label={tech} />
                  ))}
                </ul>
              </>
            )
            const cardClass =
              "group block h-full rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 transition-colors hover:border-white/[0.16] hover:bg-white/[0.03]"

            return (
              <Reveal key={project.name} delay={Math.min(i * 0.05, 0.15)} className="h-full">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.name} on GitHub`}
                    className={cardClass}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className={cardClass}>{inner}</div>
                )}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
