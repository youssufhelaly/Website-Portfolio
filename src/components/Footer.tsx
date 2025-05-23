// src/components/Footer.tsx
"use client"

import React from "react"

export default function Footer() {
  return (
    <footer className="py-8 text-gray-400">
      <div className="max-w-3xl mx-auto text-center space-y-2">
        <p>&copy; {new Date().getFullYear()} Youssuf Helaly. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <a href="https://github.com/youssufhelaly" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            GitHub
          </a>
          <a href="https://linkedin.com/in/youssuf-helaly-644957295" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            LinkedIn
          </a>
          <a href="mailto:youssufhelaly@gmail.com" className="hover:text-white">
            Email
          </a>
        </div>
      </div>
    </footer>
)
}
