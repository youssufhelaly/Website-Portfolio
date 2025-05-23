// src/components/Hero.tsx
"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { FaLinkedin, FaGithub, FaInstagram, FaFileAlt } from "react-icons/fa"
import { HiOutlineMail } from "react-icons/hi"

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col justify-center items-center text-center px-4 py-30 md:py-65 overflow-hidden "

    >
            {/* Local Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
            background: "radial-gradient(ellipse at 48% 55%, rgba(0,255,255,0.3) 0%, rgba(0,255,255,0.0) 45%)",
        }}
      />

      {/* Image + Name */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center space-x-4 mb-2 relative z-10"
      >
        {/* Profile Image */}
        <div className="rounded-full overflow-hidden w-21 h-21 border-2 border-cyan-700/50 flex items-center justify-center">
          <Image
            src="/profile.jpeg"
            alt="Portrait of Youssuf Helaly"
            width={100}
            height={100}
            className="object-cover object-center w-full h-full"
            priority
          />
        </div>
        <div className="text-left">
          <h1 className="text-white text-2xl font-semibold">
            Youssuf Helaly
          </h1>
          <p className="text-gray-400 text-sm tracking-widest uppercase">
            🇨🇦 Based in Canada
          </p>
        </div>
      </motion.div>

      {/* Title + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="flex flex-col w-max mx-auto space-y-1 relative z-10"
      >
        <h2 className="text-5xl md:text-8xl font-semibold text-white">
          FULLSTACK
        </h2>
        <div className="flex items-center space-x-4 md:space-x-6">
          <h2 className="text-4xl md:text-8xl font-semibold text-white">
            ENGINEER
          </h2>
          <motion.a
            href="mailto:youssufhelaly@gmail.com"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="inline-flex items-center px-5 py-2 border-2 border-cyan-700/50 
                       text-white rounded-full hover:bg-cyan-900 hover:text-white transition relative z-10"
            aria-label="Email Youssuf Helaly"
          >
            <HiOutlineMail className="mr-2" />
            Contact me
          </motion.a>
        </div>
      </motion.div>

      {/* Social Icons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="flex space-x-4 md:space-x-6 mt-3 relative z-10"
      >
        {[ 
          { href: "https://linkedin.com/in/youssuf-helaly-644957295", icon: FaLinkedin, label: "LinkedIn" },
          { href: "https://github.com/youssufhelaly",           icon: FaGithub,   label: "GitHub" },
          { href: "/Resume.pdf",                                 icon: FaFileAlt,  label: "Resume" },
        ].map(({ href, icon: Icon, label }) => (
          <motion.a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-11 h-11 flex items-center justify-center rounded-full border-2 border-cyan-700/50
                       hover:border-cyan-700 hover:bg-cyan-900 transition-colors text-white relative z-10"
            aria-label={label}
          >
            <Icon className="text-xl" />
          </motion.a>
        ))}
      </motion.div>
    </section>
  )
}
