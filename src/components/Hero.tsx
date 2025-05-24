"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { FaLinkedin, FaGithub, FaFileAlt } from "react-icons/fa"
import { HiOutlineMail } from "react-icons/hi"

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col justify-center items-center text-center px-4 py-24 md:py-50 overflow-hidden"
    >
      {/* Spotlight Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,255,255,0.3), transparent 45%)",
        }}
      />

      {/* Profile & Name */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center space-x-4 mb-4 relative z-10"
      >
        <div className="rounded-full overflow-hidden w-20 h-20 border-2 border-cyan-700/50">
          <Image
            src="/profile.jpeg"
            alt="Portrait of Youssuf Helaly"
            width={80}
            height={80}
            className="object-cover h-full"
            priority
          />
        </div>
        <div className="text-left">
          <h1 className="text-white text-2xl font-semibold">Youssuf Helaly</h1>
          <p className="text-gray-400 text-sm uppercase tracking-widest">🇨🇦 Based in Canada</p>
        </div>
      </motion.div>

      {/* Title & Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        className="relative z-10 space-y-2"
      >
        <h2 className="text-5xl md:text-7xl font-semibold text-white">FULLSTACK</h2>
        <div className="flex items-center justify-center space-x-4">
          <h2 className="text-4xl md:text-7xl font-semibold text-white">ENGINEER</h2>
          <motion.a
            href="mailto:youssufhelaly@gmail.com"
            className="inline-flex items-center px-4 py-2 border-2 border-cyan-700/50 text-white rounded-full hover:bg-cyan-900 transition"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <HiOutlineMail className="mr-2" /> Contact Me
          </motion.a>
        </div>
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
        className="flex space-x-4 mt-6 relative z-10"
      >
        {[ 
          { href: "https://linkedin.com/in/youssuf-helaly-644957295", icon: FaLinkedin, label: "LinkedIn" },
          { href: "https://github.com/youssufhelaly", icon: FaGithub, label: "GitHub" },
          { href: "/Resume.pdf", icon: FaFileAlt, label: "Resume" },
        ].map(({ href, icon: Icon, label }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-cyan-700/50 hover:bg-cyan-900 text-white transition"
            aria-label={label}
          >
            <Icon className="text-lg" />
          </motion.a>
        ))}
      </motion.div>
    </section>
)}