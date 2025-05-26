// src/components/Spotlight.tsx
"use client"

import React, { useEffect, useRef } from "react"

export default function Spotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${e.clientX - 200}px`
        spotlightRef.current.style.top = `${e.clientY - 200}px`
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed z-[100] left-0 top-0 w-[400px] h-[400px]"
      style={{
        background: "radial-gradient(circle at center, rgba(14, 116, 144, 0.3) 0%, rgba(0,255,255,0.0) 70%)",
        transition: "left 0.08s, top 0.08s",
        mixBlendMode: "lighten",
      }}
    />
  )
}
