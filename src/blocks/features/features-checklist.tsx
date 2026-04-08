"use client"

import { motion } from "framer-motion"

const groups = [
  {
    title: "Deployment",
    items: [
      "Push-to-deploy from any Git provider",
      "Automatic preview URLs per branch",
      "Atomic deployments with instant rollback",
      "Custom domain routing with auto-SSL",
    ],
  },
  {
    title: "Observability",
    items: [
      "Auto-instrumented distributed tracing",
      "Real-time log streaming and search",
      "Custom metric dashboards",
      "Intelligent alert routing with noise reduction",
    ],
  },
  {
    title: "Security & Compliance",
    items: [
      "SOC 2 Type II certified",
      "Fine-grained RBAC with custom roles",
      "SSO via SAML 2.0 and OIDC",
      "Audit log export and 7-year retention",
      "Automatic secret rotation",
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="mt-0.5 shrink-0 text-primary"
    >
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path
        d="M5.5 8l2 2 3-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function FeaturesChecklist() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
      <div className="mb-14 max-w-2xl">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Everything included
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          No add-ons, no surprise charges. Every plan includes the full feature
          set.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-foreground">
              {group.title}
            </h3>
            <ul className="space-y-3">
              {group.items.map((item) => (
                <motion.li
                  key={item}
                  variants={itemVariants}
                  className="flex items-start gap-2.5"
                >
                  <CheckIcon />
                  <span className="text-sm leading-snug text-foreground/80">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
