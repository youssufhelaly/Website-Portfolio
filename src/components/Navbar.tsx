// src/components/Navbar.tsx
"use client"
import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Navbar() {
  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "mailto:youssufhelaly@gmail.com" },
  ]

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const widthPct = 100 / menuItems.length
  const leftPct = hoveredIndex !== null ? hoveredIndex * widthPct : 0
  const indicatorOpacity = hoveredIndex !== null ? 1 : 0

  return (
    <nav className="fixed top-8 inset-x-0 z-50 pointer-events-none">
      <div className="mx-auto w-full max-w-xl pointer-events-auto">
        <ul
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative flex justify-between w-full text-center backdrop-blur-sm rounded-full py-2 text-white/80 border border-white/20"
        >
          {/* Animated indicator */}
          <motion.div
            className="absolute inset-y-0 bg-cyan-700/20 rounded-full pointer-events-none"
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
              className="flex-1 cursor-pointer"
              onMouseEnter={() => setHoveredIndex(idx)}
            >
              <Link
                href={item.href}
                className="relative z-10 w-full block transition-colors hover:text-white py-2"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
