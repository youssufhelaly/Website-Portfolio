import type { IconType } from "react-icons"
import { FaAndroid, FaAws, FaGamepad, FaJava } from "react-icons/fa"
import { FiCpu, FiDatabase, FiGitBranch, FiShare2, FiShield } from "react-icons/fi"
import {
  SiClaude,
  SiDocker,
  SiElasticsearch,
  SiFirebase,
  SiFlask,
  SiGo,
  SiKubernetes,
  SiLinux,
  SiModelcontextprotocol,
  SiNextdotjs,
  SiPostgresql,
  SiPrometheus,
  SiPytest,
  SiPython,
  SiPytorch,
  SiReact,
  SiRedis,
  SiRedux,
  SiRust,
  SiSpringboot,
  SiSqlite,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si"

const icons: Record<string, IconType> = {
  Python: SiPython,
  AWS: FaAws,
  "AWS Rekognition": FaAws,
  S3: FaAws,
  "Claude API": SiClaude,
  Go: SiGo,
  MCP: SiModelcontextprotocol,
  Prometheus: SiPrometheus,
  Cybersecurity: FiShield,
  Java: FaJava,
  Spring: SiSpringboot,
  "Spring Boot": SiSpringboot,
  React: SiReact,
  "React Native": SiReact,
  Redux: SiRedux,
  Elasticsearch: SiElasticsearch,
  PostgreSQL: SiPostgresql,
  Pytest: SiPytest,
  "CI/CD": FiGitBranch,
  TypeScript: SiTypescript,
  Rust: SiRust,
  TensorFlow: SiTensorflow,
  PyTorch: SiPytorch,
  Firebase: SiFirebase,
  Flask: SiFlask,
  SQLite: SiSqlite,
  SQL: FiDatabase,
  Android: FaAndroid,
  "Graph Algorithms": FiShare2,
  Pygame: FaGamepad,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  Linux: SiLinux,
  Redis: SiRedis,
  "On-device inference": FiCpu,
}

/**
 * Technology pill with its brand icon when one exists. Renders as a list
 * item; every call site sits inside a <ul>.
 */
export default function TechTag({ label }: { label: string }) {
  const Icon = icons[label]
  return (
    <li className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 font-mono text-xs text-zinc-300">
      {Icon && <Icon aria-hidden="true" className="h-3.5 w-3.5 text-zinc-400" />}
      {label}
    </li>
  )
}
