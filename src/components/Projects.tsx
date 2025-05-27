// src/components/Projects.tsx
"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { FaReact, FaGithub, FaPython, FaGamepad, FaAndroid, FaJava } from "react-icons/fa"
import {
  SiFlask,
  SiAmazon,
  SiNextdotjs,
  SiTailwindcss,
  SiSqlite,
  SiFramer,
  SiTypescript,
  SiFirebase,
} from "react-icons/si"

interface Project {
  name: string
  description: string
  image: string
  tech: { label: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | null }[]
  url?: string
}

const projects: Project[] = [
  {
    name: "Image Analysis",
    description: "Scalable React & Flask web app",
    image: "/Image_Analysis.png",
    url: "https://github.com/youssufhelaly/Image-Analysis-Web-Application",
    tech: [
      { label: "ReactJS", icon: FaReact },
      { label: "Flask", icon: SiFlask },
      { label: "AWS", icon: SiAmazon },
      { label: "SQL", icon: SiSqlite },
    ],
  },
  {
    name: "Slice Storm",
    description: "2D slicing game",
    image: "/Slice_Storm.png",
    url: "https://github.com/youssufhelaly/Slice-Storm-Game",
    tech: [
      { label: "Python", icon: FaPython },
      { label: "Pygame", icon: FaGamepad },
    ],
  },
  {
    name: "Event Attendance Management Mobile App",
    description:
      "Android app for managing event attendance with roles for Attendee, Organizer, and Administrator.",
    image: "/EAMS.png",
    url: "https://github.com/uOttawaSEG/project-group-24",
    tech: [
      { label: "Java", icon: FaJava },
      { label: "Android Studio", icon: FaAndroid },
      { label: "SQL", icon: SiSqlite },
      { label: "Firebase", icon: SiFirebase },
    ],
  },
  {
    name: "Portfolio Website",
    description: "Personal portfolio built with Next.js and Tailwind CSS",
    image: "/Portfolio.png",
    url: "https://github.com/youssufhelaly/Website-Portfolio",
    tech: [
      { label: "TypeScript", icon: SiTypescript },
      { label: "Next.js", icon: SiNextdotjs },
      { label: "ReactJS", icon: FaReact },
      { label: "Tailwind CSS", icon: SiTailwindcss },
      { label: "Framer Motion", icon: SiFramer },
    ],
  },
  {
    name: "Social Network Friend Recommender",
    description:
      "Python program implementing a friend recommendation algorithm based on common connections in social networks.",
    image: "/Social-Network.jpg",
    url: "https://github.com/youssufhelaly/Social_Network_code",
    tech: [{ label: "Python", icon: FaPython }],
  },
]

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-16 md:py-2">
      {/* Section Title */}
      <div className="relative z-10 max-w-3xl mx-auto px-1 py-5 text-cyan-700">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center text-[6rem] font-extrabold text-transparent stroke-white/10 select-none pointer-events-none "
          style={{ WebkitTextStroke: "1px rgba(14, 116, 144, 0.5)" }}
        >
          Projects
        </motion.h2>
      </div>

      {/* 2-column grid */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto">
        {projects.map((proj) => (
          <div
            key={proj.name}
            className="group relative block overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-105 min-h-[30rem] cursor-pointer"
            onClick={() => window.open(proj.url, "_blank")}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") window.open(proj.url, "_blank")
            }}
          >
            {/* Background & Overlay */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={proj.image}
                alt={proj.name}
                fill
                className="object-cover brightness-25 transform group-hover:scale-110 group-hover:brightness-40 transition-all duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-6 flex flex-col items-start space-y-2 max-w-[30rem]">
              <h3 className="text-2xl font-semibold text-white mb-2">{proj.name}</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {proj.tech.map(({ label, icon: Icon }) => (
                  <span
                    key={label}
                    className="inline-flex items-center space-x-1 bg-cyan-700/50 text-white text-sm px-3 py-1 rounded-full"
                  >
                    {Icon ? <Icon className="w-5 h-5" /> : null}
                    <span>{label}</span>
                  </span>
                ))}
              </div>
              <p className="text-gray-300 text-base mb-4">{proj.description}</p>

              {/* Reveal links */}
              <div className="overflow-hidden max-h-0 group-hover:max-h-20 transition-[max-height] duration-500 ease-in-out">
                <div className="flex items-center space-x-4 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 border border-cyan-700/50 text-white rounded-full hover:bg-cyan-900 transition text-sm"
                    onClick={e => e.stopPropagation()} // Prevent parent onClick
                  >
                    Learn More ↗
                  </a>
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gray-400 text-sm hover:text-gray-200"
                    onClick={e => e.stopPropagation()}
                  >
                    <FaGithub className="w-5 h-5 mr-1" />
                    Source
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
