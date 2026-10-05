import type { Metadata } from "next"
import Minute from "./Minute"

export const metadata: Metadata = {
  title: "60 seconds",
  description: "Youssuf Helaly, Software Developer Intern applicant at Google, in 60 seconds.",
  robots: { index: false, follow: false },
}

export default function GooglePage() {
  return <Minute />
}
