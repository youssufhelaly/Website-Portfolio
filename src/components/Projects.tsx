// src/components/Projects.tsx
"use client"

import React, { useState } from "react"
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
  SiRust,
  SiTensorflow,
} from "react-icons/si"

interface Project {
  name: string
  description: string
  image: string
  tech: { label: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | null }[]
  url?: string
  details?: string[]
}

const projects: Project[] = [
  {
    name: "ClipIt",
    description: "Real-time ML video intelligence mobile app with on-device processing",
    image: "/ClipIt.jpg",
    tech: [
      { label: "TypeScript", icon: SiTypescript },
      { label: "Rust", icon: SiRust },
      { label: "TensorFlow", icon: SiTensorflow },
      { label: "Firebase", icon: SiFirebase },
      { label: "React Native", icon: FaReact },
    ],
    details: [
      "Built a real-time ML video intelligence mobile app in React Native (iOS/Android) with a 3-tier pipeline using YAMNet and contextual models, achieving under 500ms latency and 85% detection confidence.",
      "Optimized on-device ML inference with TensorFlow.js, WebGL acceleration, and memory-efficient TypedArrays, enabling stable 30+ second rolling buffers with zero memory leaks.",
      "Engineered a high-throughput backend in Rust using Actix-Web and FFmpeg, reliably processing concurrent 50MB uploads and delivering optimized, stitched video outputs for end users.",
    ],
  },
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
    details: [
      "Developed a scalable web app for image analysis using React and Flask, leveraging AWS Rekognition for image processing and S3 for storage, improving search efficiency by 40%.",
      "Managed image uploads, user authentication, and filtering, processing 500+ images in seconds.",
      "Optimized SQLite database queries to enhance application performance and reduce processing redundancy.",
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
    details: [
      "Implemented a feature-rich 2D slicing game with advanced UI/UX, pause functionality, and dynamic difficulty.",
      "Utilized object-oriented programming principles to optimize code maintainability and performance.",
    ],
  },
  {
    name: "Event Attendance Management Mobile App",
    description:
      "Android app for managing event attendance with different roles.",
    image: "/EAMS.png",
    url: "https://github.com/uOttawaSEG/project-group-24",
    tech: [
      { label: "Java", icon: FaJava },
      { label: "Android Studio", icon: FaAndroid },
      { label: "SQL", icon: SiSqlite },
      { label: "Firebase", icon: SiFirebase },
    ],
    details: [
      "Developed a comprehensive Android mobile application for event management with role-based access control for Attendees, Organizers, and Administrators.",
      "Integrated Firebase for real-time data synchronization and user authentication, enabling seamless multi-user experiences.",
      "Implemented SQLite database for local data persistence and efficient event tracking across different user roles.",
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
    details: [
      "Built a modern, responsive portfolio website using Next.js and TypeScript with server-side rendering for optimal performance.",
      "Implemented smooth animations and transitions with Framer Motion to create an engaging user experience.",
      "Designed and developed custom components with Tailwind CSS for a clean, professional aesthetic.",
    ],
  },
  {
    name: "Friend Recommender",
    description:
      "Friend recommendation algorithm based on common connections in social networks.",
    image: "/Social-Network.jpg",
    url: "https://github.com/youssufhelaly/Social_Network_code",
    tech: [{ label: "Python", icon: FaPython }],
    details: [
      "Built nine functions to read network files, construct adjacency lists, and calculate common friends.",
      "Developed algorithm identifying users with most common friends for optimized recommendations.",
      "Implemented file parsing with validation for symmetric relationships and proper data sorting.",
    ],
  },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects" className="px-6 py-16 md:py-2">
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative bg-gray-900 rounded-2xl max-w-2xl w-full mx-4 p-8 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
            <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.name}</h2>
            <p className="text-gray-400 text-lg mb-4">{selectedProject.description}</p>
            
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map(({ label, icon: Icon }) => (
                  <span
                    key={label}
                    className="inline-flex items-center space-x-1 bg-cyan-700/50 text-white text-sm px-3 py-1 rounded-full"
                  >
                    {Icon ? <Icon className="w-5 h-5" /> : null}
                    <span>{label}</span>
                  </span>
                ))}
              </div>
            </div>

            {selectedProject.details && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Key Highlights</h3>
                <ul className="space-y-3">
                  {selectedProject.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-cyan-700 mr-3 mt-1 flex-shrink-0">▸</span>
                      <span className="text-gray-300 leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="flex gap-4 pt-4 border-t border-gray-800">
              {selectedProject.url ? (
                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition font-medium border border-gray-700"
                >
                  <FaGithub className="w-5 h-5 mr-2" />
                  View on GitHub
                </a>
              ) : (
                <div className="inline-flex items-center px-4 py-2 bg-gray-800 text-gray-400 rounded-lg border border-gray-700">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Proprietary Project
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Section Title */}
      <div className="relative z-10 max-w-3xl mx-auto px-1 py-5 text-cyan-700">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center text-[6rem] font-extrabold text-transparent stroke-white/10 select-none pointer-events-none"
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
            onClick={() => setSelectedProject(proj)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSelectedProject(proj)
            }}
          >
            {/* Background & Overlay */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={proj.image}
                alt={proj.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover brightness-25 transform group-hover:scale-110 group-hover:brightness-40 transition-all duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            {/* Content (reserve 30rem width block so no shift) */}
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

              {/* Reveal link */}
              <div className="overflow-hidden max-h-0 group-hover:max-h-20 transition-[max-height] duration-500 ease-in-out">
                <div className="flex items-center space-x-4 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <button
                    className="px-3 py-1 border border-cyan-700/50 text-white rounded-full hover:bg-cyan-900 transition text-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedProject(proj)
                    }}
                  >
                    Learn More ↗
                  </button>
                  {proj.url && (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gray-400 text-sm hover:text-gray-200"
                      onClick={e => e.stopPropagation()}
                    >
                      <FaGithub className="w-5 h-5 mr-1" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
