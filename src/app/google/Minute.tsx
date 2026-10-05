"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { FiArrowUpRight, FiFileText, FiGithub, FiLinkedin, FiMail } from "react-icons/fi"
import { site } from "@/lib/site"

const systems = [
  { value: 10, suffix: "M+", unit: "records/day", what: "Distributed AWS pipeline", where: "ThinkRF" },
  { value: 50, suffix: "M+", unit: "observations", what: "ML platform for real-time anomaly detection", where: "ThinkRF" },
  { value: 30, suffix: "%", unit: "larger simulations", what: "Distributed Go microservices + Prometheus", where: "Trend Micro" },
  { value: 204, suffix: "", unit: "escalations analyzed", what: "To pick what my AI admin agent automates, on secure Java services", where: "Autodesk" },
]

const fmt = (s: number) => `00:${String(Math.min(60, Math.floor(s))).padStart(2, "0")}`.replace("00:60", "01:00")

/* Scroll position is the clock: the recruiter controls the pace of their minute */
function Clock({ seconds, done }: { seconds: number; done: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
        <span
          className={`rounded-full border px-3 py-1 font-mono text-sm tabular-nums backdrop-blur-md transition-colors duration-500 ${
            done ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-200" : "border-white/10 bg-black/40 text-zinc-300"
          }`}
        >
          <span className={done ? "" : "animate-pulse text-red-400"}>●</span> {fmt(seconds)} / 01:00
        </span>
        <a
          href={site.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-zinc-400 backdrop-blur-md transition-colors hover:text-white"
        >
          Skip to résumé →
        </a>
      </div>
    </div>
  )
}

function Typewriter({ text }: { text: string }) {
  const reduce = useReducedMotion()
  const [n, setN] = useState(0)
  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setN((v) => (v >= text.length ? v : v + 1)), 45)
    return () => clearInterval(id)
  }, [text, reduce])
  return (
    <span aria-label={text}>
      <span aria-hidden="true">{reduce ? text : text.slice(0, n)}</span>
      <span aria-hidden="true" className="ml-0.5 inline-block w-[3px] animate-pulse bg-cyan-300 align-baseline">
        &nbsp;
      </span>
    </span>
  )
}

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-20% 0px" })
  const reduce = useReducedMotion()
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: reduce ? 0 : 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: (x) => setV(Math.round(x)) })
    return () => c.stop()
  }, [inView, to, reduce])
  return (
    <span ref={ref} className="tabular-nums">
      {v}
      {suffix}
    </span>
  )
}

function Section({ t, title, children }: { t: string; title: string; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="border-t border-white/[0.08] py-14"
    >
      <p className="font-mono text-xs tracking-widest text-cyan-300/80">{t}</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </motion.section>
  )
}

function SnugCard() {
  const ref = useRef<HTMLAnchorElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 })
  const reduce = useReducedMotion()

  return (
    <motion.a
      ref={ref}
      href="https://youssufhelaly.github.io/Snug"
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onMouseLeave={() => {
        mx.set(0)
        my.set(0)
      }}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="group block overflow-hidden rounded-xl border border-white/[0.1] bg-zinc-900/40 transition-colors hover:border-cyan-300/40"
    >
      <div className="relative overflow-hidden">
        <Image src="/Snug.jpg" alt="Snug app scanning a room" width={1600} height={1200} className="h-auto w-full" />
        {/* Room-scan sweep */}
        {!reduce && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-cyan-300/25 to-transparent"
            initial={{ top: "-25%" }}
            animate={{ top: ["-25%", "100%"] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
          />
        )}
        <span className="absolute right-3 bottom-3 rounded-md border border-cyan-300/40 bg-black/60 px-2 py-1 font-mono text-xs text-cyan-200 backdrop-blur">
          ±3.4 cm
        </span>
      </div>
      <div className="flex items-center justify-between gap-4 p-5">
        <div>
          <p className="font-medium text-white">Snug: try it →</p>
          <p className="mt-1 text-sm text-zinc-400">
            Any iPhone, no LiDAR · custom on-device YOLO · 197 unit tests · 25 beta users
          </p>
        </div>
        <FiArrowUpRight className="shrink-0 text-xl text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-300" />
      </div>
    </motion.a>
  )
}

export default function Minute() {
  const { scrollYProgress } = useScroll()
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  const [seconds, setSeconds] = useState(0)
  useMotionValueEvent(scrollYProgress, "change", (p) => setSeconds(p * 60))
  const done = seconds >= 59.5

  const btn =
    "inline-flex items-center gap-2 rounded-md border border-white/[0.12] px-4 py-2 text-sm text-zinc-200 transition-colors hover:border-cyan-300/40 hover:text-white"

  return (
    <>
      <motion.div aria-hidden="true" style={{ scaleX: bar }} className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-cyan-300" />
      <Clock seconds={seconds} done={done} />

      <main className="mx-auto w-full max-w-2xl px-6">
        <header className="pt-24 pb-14 sm:pt-28">
          <div className="flex items-center gap-3">
            <Image src="/profile.jpeg" alt="Youssuf Helaly" width={80} height={89} className="rounded-full object-cover ring-1 ring-white/10" style={{ width: 44, height: 44 }} priority />
            <p className="text-sm text-zinc-400">
              <span className="text-white">Youssuf Helaly</span> · referred by Abdo Abdelhamed
            </p>
          </div>
          <h1 className="mt-6 min-h-[1.2em] text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            <Typewriter text="Give me 60 seconds." />
          </h1>
          <p className="mt-3 text-zinc-400">Software Developer Intern, Summer 2027 · Google</p>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { big: <CountUp to={5} suffix="" />, small: "internships" },
              { big: <CountUp to={10} suffix="M+" />, small: "records/day pipeline" },
              { big: <CountUp to={50} suffix="M+" />, small: "observations on my ML platform" },
              { big: <CountUp to={25} suffix="" />, small: "beta users on my iOS app" },
            ].map((s, i) => (
              <motion.div
                key={s.small}
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.12, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ y: -4 }}
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 transition-colors hover:border-cyan-300/40"
              >
                <p className="font-mono text-3xl font-semibold text-cyan-200">{s.big}</p>
                <p className="mt-1 text-xs text-zinc-400">{s.small}</p>
              </motion.div>
            ))}
          </div>
        </header>

        <Section t="00:10" title="Five internships before graduating">
          <div className="flex flex-wrap gap-2">
            {["Solink", "Nokia", "Trend Micro", "ThinkRF", "Autodesk"].map((c, i) => (
              <motion.span
                key={c}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i }}
                className={`rounded-full border px-3 py-1 text-sm ${
                  i === 4 ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-100" : "border-white/10 text-zinc-400"
                }`}
              >
                {i + 1}. {c}
                {i === 4 && " · now"}
              </motion.span>
            ))}
          </div>
        </Section>

        <Section t="00:25" title="I've shipped real systems">
          <ul className="divide-y divide-white/[0.06]">
            {systems.map((s) => (
              <li key={s.unit} className="group -mx-3 grid gap-x-6 rounded-lg px-3 py-4 transition-colors hover:bg-white/[0.03] sm:grid-cols-[13rem_1fr]">
                <span className="text-cyan-200">
                  <span className="font-mono text-2xl font-semibold">
                    <CountUp to={s.value} suffix={s.suffix} />
                  </span>{" "}
                  <span className="text-sm text-cyan-200/70">{s.unit}</span>
                </span>
                <span className="self-center text-zinc-300">
                  {s.what} <span className="text-zinc-500">· {s.where}</span>
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section t="00:40" title="I build things because I'm curious">
          <p className="mb-6 text-zinc-300">Can an ordinary iPhone tell whether your furniture will fit?</p>
          <SnugCard />
        </Section>

        <section className="flex min-h-[70vh] flex-col justify-center border-t border-white/[0.08] py-14">
          <p className="font-mono text-xs tracking-widest text-cyan-300/80">01:00</p>
          <motion.h2
            animate={{ opacity: done ? 1 : 0.3 }}
            className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          >
            That&apos;s my minute. Thanks for giving it to me.
          </motion.h2>
          <motion.a
            href={`mailto:${site.email}?subject=${encodeURIComponent("Minute #2")}`}
            animate={done ? { scale: [1, 1.04, 1] } : {}}
            transition={{ duration: 1.6, repeat: done ? Infinity : 0 }}
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-md bg-white px-5 py-3 font-medium text-zinc-900 transition-colors hover:bg-cyan-100"
          >
            <FiMail /> If it earned minute #2, let&apos;s talk
          </motion.a>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={site.resume} target="_blank" rel="noopener noreferrer" className={btn}>
              <FiFileText /> Résumé
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={btn}>
              <FiLinkedin /> LinkedIn
            </a>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className={btn}>
              <FiGithub /> GitHub
            </a>
          </div>
          <p className="mt-10 font-mono text-xs text-zinc-500">
            Application: Software Developer Intern, BS, Summer 2027 (Waterloo · Montreal · Toronto) · {site.email}
          </p>
        </section>
      </main>
    </>
  )
}
