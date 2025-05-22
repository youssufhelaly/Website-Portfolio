// src/components/Contact.tsx
export default function Contact() {
  return (
    <section
      id="contact"
      className=" max-w-4xl mx-auto px-6 py-20 text-white"
    >
      <h2 className="text-4xl font-bold mb-8 border-b border-cyan-500 inline-block">
        Contact
      </h2>
      <p className="text-lg mb-6 text-gray-300">
        Want to get in touch? Feel free to reach out!
      </p>
      <ul className="space-y-4 text-gray-400 text-lg">
        <li>
          Email:{" "}
          <a
            href="mailto:your.email@example.com"
            className="text-cyan-400 hover:underline"
          >
            your.email@example.com
          </a>
        </li>
        <li>
          GitHub:{" "}
          <a
            href="https://github.com/youssufhelaly"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline"
          >
            github.com/youssufhelaly
          </a>
        </li>
        <li>
          LinkedIn:{" "}
          <a
            href="https://linkedin.com/in/youssuf-helaly-644957295"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline"
          >
            linkedin.com/in/youssuf-helaly-644957295
          </a>
        </li>
      </ul>
    </section>
  )
}
