export const site = {
  name: "Youssuf Helaly",
  role: "Software Engineer",
  email: "youssufhelaly@gmail.com",
  location: "Ottawa, Canada",
  github: "https://github.com/youssufhelaly",
  linkedin: "https://linkedin.com/in/youssuf-helaly-644957295",
  resume: "/Resume.pdf",
  description:
    "Software engineering student at the University of Ottawa (3.95 GPA) building cloud platforms, AI and machine learning systems, and backend services. Experience at Trend Micro, Nokia, Solink, and ThinkRF.",
}

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
