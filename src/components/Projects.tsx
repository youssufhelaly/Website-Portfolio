// src/components/Projects.tsx
"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { FaReact, FaGithub, FaPython, FaGamepad } from "react-icons/fa"
import { SiFlask, SiAmazon, SiNextdotjs, SiTailwindcss, SiSqlite, SiFramer, SiTypescript } from "react-icons/si"

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
    image: "/slice-storm.png",
    url: "https://github.com/youssufhelaly/Slice-Storm-Game",
    tech: [
      { label: "Python", icon: FaPython },
      { label: "Pygame", icon: FaGamepad },
    ],
  },
  {
    name: "Portfolio Website",
    description: "Personal portfolio built with Next.js and Tailwind CSS",
    image: "/portfolio.png",
    url: "https://github.com/youssufhelaly/Website-Portfolio",
    tech: [
      { label: "TypeScript", icon: SiTypescript },
      { label: "Next.js", icon: SiNextdotjs },
      { label: "ReactJS", icon: FaReact },
      { label: "Tailwind CSS", icon: SiTailwindcss },
      { label: "Framer Motion", icon: SiFramer },
    ],
  },
]

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-16 md:py-20" style={{paddingTop: "0px"}}>
      <div className="relative z-10 max-w-3xl mx-auto px-1 py-5 text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative inset-0 flex items-center justify-center text-[8rem] font-extrabold text-transparent stroke-white/10 pointer-events-none select-none "
        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
        >
          Projects
        </motion.h2>
        <div className="space-y-12">
          {projects.map((proj) => (
            <a
              key={proj.name}
              href={proj.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-full max-w-3xl mx-auto overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-105 min-h-[30rem]"
            >
              {/* Background & Overlay */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={proj.image}
                  alt={proj.name}
                  fill
                  className="object-cover brightness-25 transform scale-100 group-hover:scale-110 group-hover:brightness-40 transition-all duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-6 flex flex-col items-start space-y-2 max-w-[30rem]">
                <h3 className="text-2xl text-white font-semibold mb-2">
                  {proj.name}
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {proj.tech.map(({ label, icon: Icon }) => (
                    <span
                      key={label}
                      className="inline-flex items-center space-x-1 bg-cyan-700/50 text-white text-sm px-3 py-1 rounded-full"
                    >
                      {Icon ? <Icon className="w-5 h-5" /> : <img src="/icons/pygame-logo.svg" alt="Pygame" className="w-5 h-5" />}                    
                      <span>{label}</span>
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 text-base mb-4">
                  {proj.description}
                </p>

                {/* Reveal links pushing content */}
                <div className="overflow-hidden max-h-0 group-hover:max-h-20 transition-[max-height] duration-500 ease-in-out">
                  <div className="flex items-center space-x-4 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 border border-cyan-700/50 text-white rounded-full hover:bg-cyan-900 hover:text-white transition text-sm"
                    >
                      Learn More ↗
                    </a>
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gray-400 text-sm hover:text-gray-200"
                    >
                      <FaGithub className="w-5 h-5 mr-1" />
                      Source
                    </a>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
