// src/components/Testimonials.tsx
"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {FaChevronLeft, FaChevronRight} from "react-icons/fa"

import { BsStarFill } from 'react-icons/bs'


interface Testimonial {
  quote: string
  author: string
  role: string
  avatarUrl: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      "I had the pleasure of hiring and mentoring Youssuf during his co-op term at Nokia, and I can confidently say he made a lasting impression on our team. Despite being only in his second year of university, Youssuf consistently demonstrated a level of maturity and professionalism well beyond his years. From day one, Youssuf proved to be incredibly productive — tackling complex tasks with focus, speed, and quality. He showed initiative in every aspect of his work and didn’t hesitate to dive into unfamiliar territory to deliver results. What stood out the most was his ambition. Youssuf is driven, goal-oriented, and always looking for ways to grow — both personally and professionally. It’s rare to come across someone so early in their career who is this intentional about their development. I have no doubt that Youssuf has a bright future ahead of him, and I look forward to seeing where his career takes him.",
    author: "Sajjad Sherazi",
    role: "Senior Full Stack Developer | Scrum Master @ Nokia",
    avatarUrl: "/Sajjad-Sherazi.jpeg",
  },
  {
    quote:
      "I had the pleasure of working with Youssuf, and he was an absolute joy to have on the team. He quickly adapted to new challenges, learning fast and making a meaningful impact on our automation efforts. Youssuf played a key role in kick-starting our automation framework, conducting research, running mock tests during the proof of concept phase, and helping to implement API tests and fixtures in Pytest. His proficiency in Python and his ability to quickly pick up Playwright made him a valuable asset to the team. His curiosity and attention to detail were an asset. He was eager to learn, asked insightful questions, and actively applied feedback, making it easy for senior team members to mentor him. His ability to take ownership and collaborate effectively made him a fantastic team player. Any team would be lucky to have Youssuf, and I highly recommend him for any role that values technical skill, initiative, and collaboration! I would definitely hire him again :)",
    author: "Cecilia Leong",
    role: "Quality Architect at Solink",
    avatarUrl: "/Cecilia-Leong.jpeg",
  },
  {
    quote:
      "Youssuf has been an invaluable intern with our team at Trend Micro. He played a crucial role in successfully completing a variety of tasks, including several that were highly complex. His ability to learn quickly and his eagerness to embrace new technologies were remarkable. Additionally, Youssuf consistently took the initiative to propose innovative ideas, demonstrating both creativity and a proactive approach to his work.",
    author: "Munish Suri",
    role: "Staff Software Developer @ Trend Micro | Golden Kubestronaut (15x CNCF Certified) | CompTIA Security+",
    avatarUrl: "/Munish-Suri.jpeg",
  }

]

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const total = testimonials.length

  const next = () => setIndex((i) => (i + 1) % total)
  const prev = () => setIndex((i) => (i - 1 + total) % total)

  return (
    <section id="testimonials" className="text-white py-16" style={{paddingTop:"0px"}}>
      {/* Stars */}
      <div className="flex justify-center space-x-3 mb-8" style={{paddingBottom:"20px"}}>
        {Array.from({ length: 5 }).map((_, i) => (
          <BsStarFill key={i} className="text-cyan-700 w-16 h-12" />
        ))}
      </div>

      {/* Carousel */}
      <div className="relative max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <blockquote className="text-center italic text-xl leading-relaxed px-4">
              “{testimonials[index].quote}”
            </blockquote>

            {/* Author */}
            <div className="flex flex-col items-center">
              <img
                src={testimonials[index].avatarUrl}
                alt={testimonials[index].author}
                className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-cyan-700"
              />
              <p className="font-semibold text-lg">{testimonials[index].author}</p>
              <p className="text-gray-400 text-sm">{testimonials[index].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pill Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`
                rounded-full transition-all duration-300
                ${i === index ? "bg-cyan-700 w-12 h-2" : "bg-gray-600 w-10 h-2"}
              `}
              aria-label={`Show testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Prev/Next */}
        <button
          onClick={prev}
          className="absolute top-1/4 -left-20 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full cursor-pointer"
          aria-label="Previous testimonial"
        >
          <FaChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={next}
          className="absolute top-1/4 -right-20 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full cursor-pointer"
          aria-label="Next testimonial"
        >
          <FaChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </section>
  )
}
