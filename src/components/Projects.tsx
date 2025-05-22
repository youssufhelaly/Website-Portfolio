// src/components/Projects.tsx
"use client"
import { motion } from "framer-motion"

const fadeInUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 } }

export default function Projects() {
  return (
    <section
      id="Projects"
      className="relative min-h-screen px-6 py-20 max-w-4xl mx-auto text-white overflow-hidden"
    >
      {/* Contact Header */}
      <motion.div
        {...fadeInUp}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <p className="text-lg">
          <span className="font-semibold">Youssuf Helaly</span> &bull; +1 (343) 254-9694 &bull;{' '}
          <a href="mailto:youssufhelaly@gmail.com" className="text-cyan-400 hover:underline">
            youssufhelaly@gmail.com
          </a> &bull;{' '}
          <a
            href="https://linkedin.com/in/youssuf-helaly-644957295"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline"
          >
            LinkedIn
          </a> &bull;{' '}
          <a
            href="https://github.com/youssufhelaly"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline"
          >
            GitHub
          </a>
        </p>
      </motion.div>

      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="space-y-16"
      >
        {/* Education */}
        <div>
          <h3 className="text-2xl font-semibold mb-2 border-b-2 border-cyan-500 inline-block">
            Education
          </h3>
          <p className="text-lg">
            University of Ottawa (uOttawa) — Bachelor of Applied Science in Software Engineering | 3.9/4.0 GPA
            <span className="text-gray-400"> (Expected Graduation: Apr 2027)</span>
          </p>
          <p className="text-gray-300">
            Relevant Coursework: Data Structures and Algorithms, Intro to Software Engineering, Operating Systems,
            Computer Architecture, Software Quality Assurance, Professional Communication and Responsibility
          </p>
        </div>

        {/* Work Experience */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 border-b-2 border-cyan-500 inline-block">
            Work Experience
          </h3>
          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-semibold">Nokia — Full-Stack Engineering Intern</h4>
              <p className="text-gray-400 mb-2">Kanata, ON | Jan 2025 - Apr 2025</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Engineered a high-performance Java Spring back-end, reducing bugs and Tomcat log errors by 20%.</li>
                <li>Optimized Elasticsearch queries to streamline logic and enhance system responsiveness.</li>
                <li>Enhanced React/Redux frontend, resolved API issues, and reduced load times by 40%.</li>
                <li>Containerized applications with Docker, orchestrated with Kubernetes, and automated builds using Jenkins.</li>
                <li>Developed JUnit and Cypress tests, increasing code coverage by 15% and boosting reliability.</li>
                <li>Created PostgreSQL migration scripts, ensuring 100% data integrity during updates.</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold">Solink — Software Engineering Intern</h4>
              <p className="text-gray-400 mb-2">Kanata, ON | May 2024 - Aug 2024</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Designed and implemented 50+ test cases and 5,000+ lines of code using Pytest and Robot.</li>
                <li>Built and maintained a scalable RESTful API in Python with 20+ endpoints.</li>
                <li>Integrated Playwright and Selenium for UI testing, improving test reliability.</li>
                <li>Automated test workflows, saving $2,000+ monthly and accelerating release cycles.</li>
                <li>Debugged flaky tests and CI issues, reducing false positives in regression runs.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 border-b-2 border-cyan-500 inline-block">
            Projects
          </h3>
          <div className="space-y-6 text-gray-300">
            <div>
              <p className="font-semibold">Image Analysis Web Application</p>
              <p>
                Scalable React & Flask web app using AWS Rekognition for image processing and S3 for storage;
                improved search efficiency by 40%.
              </p>
            </div>
            <div>
              <p className="font-semibold">Slice Storm</p>
              <p>
                2D slicing game built with Python & Pygame, featuring slicing mechanics, bomb avoidance, and
                dynamic difficulty using OOP principles.
              </p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 border-b-2 border-cyan-500 inline-block">
            Skills
          </h3>
          <p className="text-gray-300">
            <span className="font-semibold">Languages:</span> JavaScript, Python, SQL, Java, TypeScript, C, HTML, CSS
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Frameworks/Libraries:</span> Spring Boot, React, Flask, Redux, TensorFlow,
            PyTorch, NumPy, matplotlib
          </p>
          <p className="text-gray-300">
            <span className="font-semibold">Tools:</span> Git, Docker, Kubernetes, AWS, Jenkins, Jira, JUnit,
            Linux (Red Hat), Elasticsearch, PostgreSQL
          </p>
        </div>

        {/* Leadership */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 border-b-2 border-cyan-500 inline-block">
            Leadership & Volunteering
          </h3>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>
              Led volunteer teams supporting homeless individuals in collaboration with staff and partners (Jan
              2025).
            </li>
            <li>
              Gold medalist & regional soccer champion as team captain, demonstrating leadership and
              teamwork (May 2024).
            </li>
            <li>
              Participated in leadership & professional growth conferences, enhancing skills and networking
              (Nov 2023).
            </li>
          </ul>
        </div>
      </motion.div>
    </section>
  )
}
