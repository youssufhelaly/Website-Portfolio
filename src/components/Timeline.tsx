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
    title: "Full-Stack Engineering Intern",
    subtitle: "Nokia",
    imageUrl: "/nokia-logo.png",
    website: "https://www.nokia.com/",
    details: [
      "Engineered a high-performance Java Spring backend, reducing bugs and Tomcat log errors by 20%.",
      "Enhanced React/Redux frontend, fixing API issues and reducing load times by 40%, improving UX.",
      "Collaborated with engineers and PMs in a fast-paced Agile Scrum team, ensuring effective communication.",
      "Authored PostgreSQL migration scripts, ensuring 100% data integrity and reducing transition time.",
    ],
  },
  {
    year: "2024",
    title: "Software Engineering Intern",
    subtitle: "Solink",
    imageUrl: "/solink-logo.jpeg",
    website: "https://solink.com",
    details: [
      "Designed and implemented 50+ test cases and 5,000+ lines of code reducing manual testing by 30%.",
      "Developed scalable RESTful APIs in Python, managing 20+ YAML-configured endpoints",
      "Automated test execution workflows, resulting in savings of $2,000+ monthly and accelerating release cycles.",
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

  // Reserve enough minHeight for the bigger tab (prevents jump)
  const minTimelineHeight = tab === "experience" ? "28rem" : "16rem"

  return (
    <section id="timeline" className="relative py-16 md:py-20" style={{ paddingBottom: '0px' }}>
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
              }  hover:text-white`}
            >
              Experience
            </button>
            <button
              onClick={() => setTab("education")}
              className={`px-4 py-2 cursor-pointer rounded-full text-lg font-medium transition ${
                tab === "education"
                  ? "bg-cyan-900 text-white"
                  : "text-gray-300"
              }  hover:text-white`}
            >
              Education
            </button>
          </div>
        </div>
        {/* Timeline */}
        <div className="relative" style={{ minHeight: minTimelineHeight }}>
          {/* Fade-in vertical line */}
          <motion.div
            className="absolute left-18 inset-y-0 w-px bg-cyan-900 z-10"
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
                {/* Year */}
                <div className="absolute -left-12 top-7 w-20 text-right text-gray-400 font-mono text-base z-20">
                  {year}
                </div>
                {/* Logo (fixed size, always reserve space) */}
                <div
                  className="absolute left-10 top-3 w-16 h-16 rounded-lg overflow-hidden border-2 border-cyan-700/50 bg-cyan-900 z-20 cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => website && window.open(website, "_blank")}
                  style={{ width: 64, height: 64 }}
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={`${subtitle} logo`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                      priority
                    />
                  ) : null}
                </div>
                {/* Content */}
                <div className="flex-1 ml-32 text-gray-300 z-10">
                  <h3 className="text-xl font-semibold text-white">{title}</h3>
                  <p className="italic text-sm mb-2">{subtitle}</p>
                  <ul className="list-disc list-inside space-y-1 text-base">
                    {details.map((d, i) => (
                      <li key={i}>{d}</li>
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
