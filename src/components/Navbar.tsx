// src/components/Navbar.tsx
"use client"
import { useState } from "react"
import Link from "next/link"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black bg-opacity-70 backdrop-blur-md text-white px-6 py-4 flex justify-between items-center z-50">
      <div className="text-2xl font-bold">
        <Link href="/">YH</Link>
      </div>

      <div className="hidden md:flex space-x-8">
        <Link href="#about" className="hover:text-cyan-400">About</Link>
        <Link href="#projects" className="hover:text-cyan-400">Projects</Link>
        <Link href="#contact" className="hover:text-cyan-400">Contact</Link>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none" stroke="currentColor" strokeWidth="2"
          viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"
        >
          {open ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M3 12h18M3 6h18M3 18h18" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-black bg-opacity-90 flex flex-col items-center space-y-4 py-4 md:hidden">
          <Link href="#about" onClick={() => setOpen(false)} className="hover:text-cyan-400">About</Link>
          <Link href="#projects" onClick={() => setOpen(false)} className="hover:text-cyan-400">Projects</Link>
          <Link href="#contact" onClick={() => setOpen(false)} className="hover:text-cyan-400">Contact</Link>
        </div>
      )}
    </nav>
  )
}
