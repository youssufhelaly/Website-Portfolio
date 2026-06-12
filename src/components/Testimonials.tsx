import Image from "next/image"
import { FiArrowUpRight } from "react-icons/fi"
import Reveal from "@/components/Reveal"
import SectionHeading from "@/components/SectionHeading"
import { site } from "@/lib/site"

interface Recommendation {
  quote: string
  author: string
  role: string
  company: string
  avatar: string
}

const recommendations: Recommendation[] = [
  {
    quote:
      "Despite being only in his second year of university, Youssuf consistently demonstrated a level of maturity and professionalism well beyond his years. He showed initiative in every aspect of his work and didn't hesitate to dive into unfamiliar territory to deliver results. It's rare to come across someone so early in their career who is this intentional about their development.",
    author: "Sajjad Sherazi",
    role: "Senior Full Stack Developer, Scrum Master",
    company: "Nokia",
    avatar: "/Sajjad-Sherazi.jpeg",
  },
  {
    quote:
      "Youssuf has been an invaluable intern with our team at Trend Micro. He played a crucial role in successfully completing a variety of tasks, including several that were highly complex. His ability to learn quickly and his eagerness to embrace new technologies were remarkable.",
    author: "Munish Suri",
    role: "Staff Software Developer",
    company: "Trend Micro",
    avatar: "/Munish-Suri.jpeg",
  },
  {
    quote:
      "He quickly adapted to new challenges, learning fast and making a meaningful impact on our automation efforts. His ability to take ownership and collaborate effectively made him a fantastic team player. I would definitely hire him again.",
    author: "Cecilia Leong",
    role: "Quality Architect",
    company: "Solink",
    avatar: "/Cecilia-Leong.jpeg",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-20 px-6 py-20 md:py-28">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="Testimonials"
            title="What the people I worked for say."
            sub="Written by the senior engineers and managers who hired and mentored me."
          />
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-3">
          {recommendations.map((rec, i) => (
            <Reveal key={rec.author} delay={Math.min(i * 0.06, 0.18)} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors hover:border-white/[0.16]">
                <div
                  aria-hidden="true"
                  className="mb-4 font-serif text-4xl leading-none text-cyan-300/50"
                >
                  &ldquo;
                </div>
                <blockquote className="flex-1 text-sm leading-relaxed text-zinc-300">
                  {rec.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                  <Image
                    src={rec.avatar}
                    alt={`Portrait of ${rec.author}`}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full border border-white/10 object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{rec.author}</p>
                    <p className="text-xs text-zinc-500">
                      {rec.role} · {rec.company}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 text-sm text-zinc-500">
            Full recommendations available on{" "}
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-zinc-300 transition-colors hover:text-cyan-200"
            >
              LinkedIn
              <FiArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
