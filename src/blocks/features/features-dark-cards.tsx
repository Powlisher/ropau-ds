"use client"

import { motion } from "framer-motion"

const features = [
  {
    title: "Zero-Config Tracing",
    description:
      "Auto-instrumented distributed tracing across your entire stack. No code changes, no SDK integration. Just deploy and trace.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10h2l2-5 3 10 2-5h5" />
      </svg>
    ),
  },
  {
    title: "Instant Rollbacks",
    description:
      "Every deployment is immutable. Roll back to any previous version in under 4 seconds. No downtime, no data loss.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm3.5-3L3 10l3.5 3m3.5-6v3l2 1" />
      </svg>
    ),
  },
  {
    title: "Intelligent Alerting",
    description:
      "Alerts that learn your system baseline and only fire on anomalies. Reduces noise by 89% compared to threshold-based rules.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2a6 6 0 00-6 6c0 3 1 5.5 6 9 5-3.5 6-6 6-9a6 6 0 00-6-6zm0 8a2 2 0 100-4 2 2 0 000 4z" />
      </svg>
    ),
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function FeaturesDarkCards() {
  return (
    <section className="bg-[#0f0f10] px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 max-w-2xl">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-[#fafaf9] sm:text-3xl">
            Infrastructure that works while you sleep
          </h2>
          <p className="mt-3 text-base text-[#78787a]">
            Built-in resilience so your team can focus on features, not fires.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={itemVariants}>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                className="rounded-xl border border-[#1f1f22] p-6"
                style={{
                  boxShadow:
                    "0 1px 2px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.15), 0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-[#1a1a1d] text-[#e4e4e2]">
                  {f.icon}
                </div>
                <h3 className="font-heading text-base font-semibold tracking-tight text-[#fafaf9]">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#a1a1a0]">
                  {f.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
