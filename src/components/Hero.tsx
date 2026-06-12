import Image from "next/image"
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi"
import { site } from "@/lib/site"

const companies = [
  {
    name: "Trend Micro",
    href: "https://www.trendmicro.com",
    logo: "/trendmicro-logo.jpg",
  },
  {
    name: "Nokia",
    href: "https://www.nokia.com",
    logo: "/nokia-logo.png",
  },
  {
    name: "Solink",
    href: "https://solink.com",
    logo: "/solink-logo.jpeg",
  },
  {
    name: "ThinkRF",
    href: "https://www.thinkrf.com",
    logo: "/ThinkRF-logo.png",
    logoClass: "scale-125",
  },
]

const focus = ["Cloud Engineering", "AI / Machine Learning", "Backend Systems"]

export default function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="px-6 pb-16 pt-28 md:pb-24 md:pt-36">
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid items-start gap-12 md:grid-cols-[1fr_auto]">
          {/* Identity, headline, proof */}
          <div>
            <div className="animate-fade-up flex items-center gap-4" style={{ "--delay": "0ms" } as React.CSSProperties}>
              <Image
                src="/profile.jpeg"
                alt="Portrait of Youssuf Helaly"
                width={56}
                height={56}
                priority
                className="h-14 w-14 rounded-full border border-white/10 object-cover md:hidden"
              />
              <div>
                <h1 className="text-lg font-semibold tracking-tight text-white">Youssuf Helaly</h1>
                <p className="text-sm text-zinc-400">
                  Software Engineering Student at the University of Ottawa ·{" "}
                  <span className="font-medium text-zinc-200">3.95 GPA</span>
                </p>
              </div>
            </div>

            <p
              className="animate-fade-up mt-8 text-[3.4rem] font-semibold uppercase leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl"
              style={{ "--delay": "80ms" } as React.CSSProperties}
            >
              Software
              <span className="block text-zinc-600">Engineer</span>
            </p>

            <p
              className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg"
              style={{ "--delay": "160ms" } as React.CSSProperties}
            >
              Four internships across cybersecurity, telecom, video security, and RF intelligence.
              I ship ML pipelines, cloud infrastructure, and backend services that run in
              production, currently at ThinkRF.
            </p>

            <ul
              className="animate-fade-up mt-5 flex flex-wrap gap-2"
              style={{ "--delay": "220ms" } as React.CSSProperties}
            >
              {focus.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs tracking-wide text-zinc-300"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div
              className="animate-fade-up mt-8 flex flex-wrap items-center gap-3"
              style={{ "--delay": "280ms" } as React.CSSProperties}
            >
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200"
              >
                View Resume
                <FiArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-white/30 hover:text-white"
              >
                <FiMail className="h-4 w-4" />
                Get in touch
              </a>
              <div className="flex items-center gap-2">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
                >
                  <FiGithub className="h-4 w-4" />
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
                >
                  <FiLinkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Portrait, desktop only */}
          <div
            className="animate-fade-up relative hidden md:block"
            style={{ "--delay": "200ms" } as React.CSSProperties}
          >
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-[2rem] bg-cyan-400/[0.06] blur-2xl"
            />
            <Image
              src="/profile.jpeg"
              alt="Portrait of Youssuf Helaly"
              width={264}
              height={316}
              priority
              className="aspect-[5/6] w-[264px] rounded-3xl border border-white/10 object-cover"
            />
          </div>
        </div>

        {/* Proof strip: companies */}
        <div
          className="animate-fade-up mt-14 border-t border-white/[0.08] pt-8 md:mt-20"
          style={{ "--delay": "360ms" } as React.CSSProperties}
        >
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-600">
              Experience at
            </span>
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
              {companies.map((company) => (
                <li key={company.name}>
                  <a
                    href={company.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5"
                  >
                    <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white">
                      <Image
                        src={company.logo}
                        alt={`${company.name} logo`}
                        width={36}
                        height={36}
                        className={`h-full w-full object-contain p-1 ${company.logoClass ?? ""}`}
                      />
                    </span>
                    <span className="text-sm font-medium text-zinc-400 transition-colors group-hover:text-white">
                      {company.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
