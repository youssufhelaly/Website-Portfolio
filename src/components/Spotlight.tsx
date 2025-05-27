// Place this at app level, e.g. in _app.tsx, layout.tsx, or a top-level component
"use client"
import React, { useEffect, useRef } from "react";

export default function Spotlight() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (spotRef.current) {
        spotRef.current.style.transform = `translate3d(${e.clientX - 200}px,${e.clientY - 200}px,0)`; // Center the 400x400 div
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={spotRef}
      className="pointer-events-none fixed z-[100] left-0 top-0 w-[400px] h-[400px]"
      style={{
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, rgba(0,0,0,0) 70%)",
        willChange: "transform, opacity",
        transition: "opacity 0.25s",
      }}
      aria-hidden="true"
    />
  );
}
