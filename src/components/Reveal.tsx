"use client"

import { motion, useReducedMotion } from "framer-motion"

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

/**
 * Scroll-triggered reveal for below-the-fold content. Children stay
 * server-rendered; this wrapper only animates opacity and transform once.
 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  )
}
