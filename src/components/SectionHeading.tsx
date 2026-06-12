interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: string
  sub?: string
}

export default function SectionHeading({ index, eyebrow, title, sub }: SectionHeadingProps) {
  return (
    <div className="mb-12 md:mb-16">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-cyan-300/80">
        <span className="text-zinc-600">{index}</span>
        <span className="mx-2 text-zinc-700">/</span>
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{title}</h2>
      {sub && <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">{sub}</p>}
    </div>
  )
}
