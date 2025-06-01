// src/components/ClientWrapper.tsx
"use client"

import dynamic from "next/dynamic"

const TechStack = dynamic(() => import("./TechStack"), { ssr: false })
const Projects = dynamic(() => import("./Projects"), { ssr: false })
const Testimonials = dynamic(() => import("./Testimonials"), { ssr: false })
const Footer = dynamic(() => import("./Footer"), { ssr: false })

export default function ClientWrapper() {
  return (
    <>
      <TechStack />
      <Projects />
      <Testimonials />
      <Footer />
    </>
  )
}
