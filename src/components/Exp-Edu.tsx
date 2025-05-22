"use client"
"use client"
import { useState } from "react"
import { motion } from "framer-motion"

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
      "Optimized Elasticsearch indices and queries, cutting average query time from 200ms to 120ms",
      "Designed and deployed Docker containers into Kubernetes clusters, improving deployment speed by 50%",
      "Collaborated with cross-functional teams on feature specs and API contracts to ensure scalability",
    ],
  },
  {
    year: "2024",
    title: "Software Engineering Intern",
    subtitle: "Solink",
    imageUrl: "/solink-logo.jpeg",
    website: "https://solink.com",
    details: [
      "Developed end-to-end test suites with Pytest and Playwright, raising automated test coverage from 60% to 85%",
      "Built and documented RESTful APIs in Flask, enabling seamless integration with third-party analytics tools",
      "Automated deployment pipelines with GitLab CI/CD, reducing manual deployment errors by 90%",
      "Conducted performance profiling and refactored Python services to reduce memory usage by 25%",
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
      "Relevant Coursework: Data Structures & Algorithms, Operating Systems, Computer Architecture, Software Quality Assurance, Professional Communication & Responsibility",
    ],
  },
]

export default function Timeline() {
  const [tab, setTab] = useState<"experience" | "education">("experience")
  const items = tab === "experience" ? experience : education

  return (
    <section id="timeline" className="relative min-h-screen px-6 py-24">
      {/* Tabs */}
      <div className="flex space-x-6 mb-16 justify-center">
        <button
          onClick={() => setTab("experience")}
          className={`px-6 py-3 rounded-full border-2 transition text-lg font-medium ${
            tab === "experience"
              ? "bg-cyan-700 text-white border-cyan-500"
              : "text-gray-300 border-gray-600"
          }`}
        >
          Experience
        </button>
        <button
          onClick={() => setTab("education")}
          className={`px-6 py-3 rounded-full border-2 transition text-lg font-medium ${
            tab === "education"
              ? "bg-cyan-700 text-white border-cyan-500"
              : "text-gray-300 border-gray-600"
          }`}
        >
          Education
        </button>
      </div>

      {/* Timeline container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical line on the left */}
        <div className="absolute left-40 inset-y-0 w-px bg-gray-600"></div>

        {/* Items */}
        <div className="space-y-20 relative z-10">
          {items.map(({ year, title, subtitle, details, imageUrl, website }) => (
            <motion.div
              key={year + title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative flex items-start"
            >
              {/* Logo centered on line */}
              {imageUrl && (
                <div className="absolute left-30 top-2 w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-600 bg-gray-800">
                  <img
                    src={imageUrl}
                    alt={`${subtitle} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Year to the left of line */}
              <div className="absolute left-0 top-8 w-28 text-right text-gray-400 font-mono text-lg">
                {year}
              </div>

              {/* Content right of line */}
              <div className="flex-1 ml-56 text-gray-300 width-500">
                <div className="mb-3">
                  <h3 className="text-2xl font-semibold text-white">{title}</h3>
                  <p className="italic text-base">{subtitle}</p>
                </div>
                <ul className="w-full max-w-3xl list-disc list-inside space-y-2 text-base">
                  {details.map((d, i) => (
                    <li key={i} style={{ width: '850px' }}>{d}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}