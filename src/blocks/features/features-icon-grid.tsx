"use client"

import { motion } from "framer-motion"

const features = [
  {
    title: "Instant Deploys",
    description:
      "Atomic deployments with automatic preview URLs. Ship to production in seconds, roll back in fewer.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4v10m0 0l4-4m-4 4l-4-4M4 18l2 2h12l2-2" />
      </svg>
    ),
  },
  {
    title: "Edge Runtime",
    description:
      "Server-side logic at 300+ global PoPs. V8 isolates with 5ms cold starts and persistent connections.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 4L7 13h4l-1 7 6-9h-4l1-7z" />
      </svg>
    ),
  },
  {
    title: "Full Observability",
    description:
      "Unified tracing, metrics, and logs. Auto-instrumented across Node, Python, Go, and Rust runtimes.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12h3l2.5-6 3.5 12 2.5-6H20" />
      </svg>
    ),
  },
  {
    title: "Team Collaboration",
    description:
      "Multi-cursor editing, real-time presence, and CRDT-based sync. Conflicts resolve automatically.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2m7-10a4 4 0 100-8 4 4 0 000 8zm11 10v-2a4 4 0 00-3-3.87M15 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "Enterprise Security",
    description:
      "SOC 2 Type II, fine-grained RBAC, SSO, and audit logs with 7-year configurable retention.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Smart Scaling",
    description:
      "Auto-scales in under 2 seconds. Connection pooling, CDN caching, and request routing built in.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20V10m4 10V6m4 14V4m4 16v-8m4 8v-4" />
      </svg>
    ),
  },
  {
    title: "Workflow Automation",
    description:
      "Custom triggers that chain actions across integrations. Reduce manual tasks by 14 hours per week.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 12h8m-8 6h16" />
      </svg>
    ),
  },
  {
    title: "Developer CLI",
    description:
      "Full platform control from the terminal. Scriptable, pipe-friendly, with autocomplete for every command.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 17l6-5-6-5m8 10h8" />
      </svg>
    ),
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function FeaturesIconGrid() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="mb-14 max-w-2xl">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Platform capabilities
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Built for teams that refuse to choose between speed and reliability.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
      >
        {features.map((f) => (
          <motion.div key={f.title} variants={itemVariants}>
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            >
              <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {f.icon}
              </div>
              <h3 className="font-heading text-sm font-semibold tracking-tight text-foreground">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
