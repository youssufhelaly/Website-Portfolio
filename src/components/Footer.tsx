import { site } from "@/lib/site"

const links = [
  { name: "GitHub", href: site.github },
  { name: "LinkedIn", href: site.linkedin },
  { name: "Resume", href: site.resume },
  { name: "Email", href: `mailto:${site.email}` },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-6 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 text-sm text-zinc-500 md:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {site.name} · {site.location}
        </p>
        <nav aria-label="Footer">
          <ul className="flex items-center gap-6">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  {...(link.href.startsWith("http") || link.href.endsWith(".pdf")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="transition-colors hover:text-white"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
