// src/components/Timeline.tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface Item {
  year: string
  title: string
  subtitle: string
  details: string[]
  imageUrl?: string
  website?: string
}

const experience: Item[] = [
  {
    year: "2025",
    title: "Software Engineering Intern",
    subtitle: "Trend Micro",
    imageUrl: "/trendmicro-logo.jpg",
    website: "https://www.trendmicro.com/",
    details: [
      "Enhanced <b>Go-based digital twin</b> platform with <b>network</b> and <b>API</b> improvements, adding <b>Prometheus</b> monitoring and enabling <u>30%</u> more complex cybersecurity simulations.",
      "Independently designed and built a real-time <b>cybersecurity</b> event processor that converts raw logs into structured attack narratives with phase detection and impact scoring, processing <u>1000+</u> events per attack for <b>stakeholders</b>.",
      "Led the design and development of an <b>AI-powered</b> world generation system using <b>MCP</b> to autonomously create <u>100+</u> realistic environments with dynamic network topologies and CVE embedding, cutting manual setup by <u>80%</u>.",
    ],
  },
  {
    year: "2025",
    title: "Full-Stack Engineering Intern",
    subtitle: "Nokia",
    imageUrl: "/nokia-logo.png",
    website: "https://www.nokia.com/",
    details: [
      "Improved system reliability by <u>20%</u> by fixing service-layer defects and reducing Tomcat log errors in <b>Java Spring</b>.",
      "Automated <b>Elasticsearch</b> index config, cutting data inconsistencies by <u>40%</u> and raising backend data quality.",
      "Improved <b>React</b> workflows with <b>Redux</b> and <b>API</b> integration, enhancing form handling and interface responsiveness, reducing page load times by <u>~25%</u> and improving user experience.",
      "Partnered with engineers, PMs, and designers in a fast-paced <b>Agile Scrum</b> team to accelerate feature delivery.",
      "Authored <b>PostgreSQL migration scripts</b>, ensuring <u>100%</u> data integrity and accelerating database update cycles.",
    ],
  },
  {
    year: "2024",
    title: "Software Engineering Intern",
    subtitle: "Solink",
    imageUrl: "/solink-logo.jpeg",
    website: "https://solink.com",
    details: [
      "Developed scalable <b>Python RESTful APIs</b> managing <u>20+</u> <b>YAML</b>-configured endpoints, enabling rapid feature launches in collaboration with front-end and product teams.",
      "Designed and implemented <u>50+</u> automated test cases, raising release quality and reducing manual testing by <u>30%</u>.",
      "Automated test execution workflows, saving <u>$2,000+</u> monthly and accelerating release cycles.",
      "Diagnosed and fixed CI/CD failures and flaky tests, increasing reliability and reducing regression false positives.",
    ],
  },
]


const education: Item[] = [
  {
    year: "2023 – 2027",
    title: "B.A.Sc. Software Engineering",
    subtitle: "University of Ottawa",
    imageUrl: "/uottawa-logo.jpg",
    website: "https://www.uottawa.ca",
    details: [
      "3.95/4.00 GPA",
      "Relevant Coursework: Data Structures & Algorithms, Operating Systems, Computer Architecture, Software Quality Assurance, Professional Communication.",
    ],
  },
]

export default function Timeline() {
  const [tab, setTab] = useState<"experience" | "education">("experience")
  const items = tab === "experience" ? experience : education

  // Reserve enough minHeight to prevent vertical jumps when switching tabs
  const minTimelineHeight = tab === "experience" ? "28rem" : "16rem"

  return (
    <section
      id="timeline"
      className="relative py-16 md:py-30"
      style={{ paddingBottom: "0px" }}
    >
      <div className="max-w-3xl mx-auto px-6">
        {/* Tabs Container */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-full border-2 border-cyan-700/50 overflow-hidden">
            <button
              onClick={() => setTab("experience")}
              className={`px-4 py-2 cursor-pointer rounded-full text-lg font-medium transition ${
                tab === "experience"
                  ? "bg-cyan-900 text-white"
                  : "text-gray-300"
              } hover:text-white`}
            >
              Experience
            </button>
            <button
              onClick={() => setTab("education")}
              className={`px-4 py-2 cursor-pointer rounded-full text-lg font-medium transition ${
                tab === "education"
                  ? "bg-cyan-900 text-white"
                  : "text-gray-300"
              } hover:text-white`}
            >
              Education
            </button>
          </div>
        </div>
        {/* Timeline (reserve min height to avoid shifts) */}
        <div className="relative" style={{ minHeight: minTimelineHeight }}>
          {/* Fade‐in vertical line (z-index 0, behind logos) */}
          <motion.div
            className="absolute left-18 inset-y-0 w-px bg-cyan-900"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          />
          <div className="space-y-16 relative">
            {items.map(({ year, title, subtitle, details, imageUrl, website }) => (
              <motion.div
                key={year + title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative flex items-start min-h-[7rem]"
              >
                {/* Year to the left */}
                <div className="absolute -left-12 top-7 w-20 text-right text-gray-400 font-mono text-base z-20">
                  {year}
                </div>

                {/* Logo centered on line (reserve 64×64 px always) */}
                <div
                  className="absolute left-10 top-3 w-16 h-16 rounded-lg overflow-hidden border-2 border-cyan-700/50 bg-cyan-900 z-20 cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => website && window.open(website, "_blank")}
                  style={{ width: 64, height: 64 }}
                >
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={`${subtitle} logo`}
                      width={64}
                      height={64}
                      className="object-contain w-full h-full bg-white"
                      priority
                    />
                  )}
                </div>

                {/* Content right of line */}
                <div className="flex-1 ml-32 text-gray-300 z-10">
                  <h3 className="text-xl font-semibold text-white">{title}</h3>
                  <p className="italic text-sm mb-2">{subtitle}</p>
                  <ul className="list-disc list-inside space-y-1 text-base">
                    {details.map((d, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: d }} />
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
