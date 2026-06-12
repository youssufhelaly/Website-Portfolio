import { FiArrowUpRight, FiMail } from "react-icons/fi"
import Reveal from "@/components/Reveal"
import { site } from "@/lib/site"

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 px-6 py-20 md:py-32">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent px-6 py-14 text-center md:py-20">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-300/80">
              Contact
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Let&apos;s build something that matters.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-400">
              I am open to internship and early-career opportunities in cloud, AI/ML, and backend
              engineering. Email me and I will reply quickly.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200"
              >
                <FiMail className="h-4 w-4" />
                {site.email}
              </a>
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-white/30 hover:text-white"
              >
                View Resume
                <FiArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
