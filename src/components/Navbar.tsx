// src/components/Navbar.tsx
"use client"

import React, { useState, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Navbar() {
  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "mailto:youssufhelaly@gmail.com" },
  ]

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLUListElement>(null)
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([])

  const widthPct = 100 / menuItems.length
  const leftPct = hoveredIndex !== null ? hoveredIndex * widthPct : 0
  const indicatorOpacity = hoveredIndex !== null ? 1 : 0

  return (
    <nav className="fixed top-8 inset-x-0 z-50 pointer-events-none">
      <div className="mx-auto w-full max-w-md pointer-events-auto">
        <ul
          ref={containerRef}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative grid grid-cols-4 w-full text-center backdrop-blur-sm rounded-full py-5 text-white/80 border border-white/20"
        >
          {/* Animated indicator */}
          <motion.div
            className="absolute inset-y-0 bg-white/10 rounded-full pointer-events-none"
            initial={false}
            animate={{
              left: `${leftPct}%`,
              width: `${widthPct}%`,
              opacity: indicatorOpacity,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />

          {menuItems.map((item, idx) => (
            <li
              key={item.name}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIndex(idx)}
            >
              <Link legacyBehavior href={item.href} passHref >
                <a
                  ref={(el) => { linkRefs.current[idx] = el }}
                  className="relative z-10 w-full text-center py-2 transition-colors hover:text-white"
                >
                  {item.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
