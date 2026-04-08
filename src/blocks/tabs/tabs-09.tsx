"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const primaryTabs = [
  {
    id: "design",
    label: "Design",
    secondary: [
      { id: "tokens", label: "Tokens", content: "126 design tokens defined across color, spacing, typography, and elevation scales. Last synced from Figma on March 24." },
      { id: "components", label: "Components", content: "48 components documented with usage guidelines. 12 marked as stable, 28 in beta, 8 in experimental status." },
      { id: "patterns", label: "Patterns", content: "Layout patterns for dashboards, forms, and detail views. Each pattern includes responsive breakpoint specifications." },
    ],
  },
  {
    id: "engineering",
    label: "Engineering",
    secondary: [
      { id: "apis", label: "APIs", content: "RESTful and GraphQL endpoints serving 2.1M requests daily. Average latency at 47ms. Rate limiting at 1,000 req/min per key." },
      { id: "infra", label: "Infrastructure", content: "Multi-region deployment across 3 availability zones. Auto-scaling configured for 200-2,000 instances based on CPU and memory." },
      { id: "ci", label: "CI/CD", content: "Pipeline runs in 4m 12s on average. 97.3% pass rate over the last 30 days. Flaky test quarantine catches 8 tests." },
    ],
  },
  {
    id: "product",
    label: "Product",
    secondary: [
      { id: "roadmap", label: "Roadmap", content: "Q2 focus areas: collaboration features, mobile performance, and enterprise SSO. 14 epics scoped, 6 in active development." },
      { id: "metrics", label: "Metrics", content: "North star metric: weekly active collaborators, currently at 8,420. Secondary: time-to-first-value at 3m 47s for new users." },
      { id: "feedback", label: "Feedback", content: "347 feedback items triaged this month. Top requests: bulk export, custom dashboards, and webhook filtering." },
    ],
  },
]

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function Tabs09() {
  const [primaryActive, setPrimaryActive] = useState(primaryTabs[0].id)
  const currentPrimary = primaryTabs.find((t) => t.id === primaryActive)!
  const [secondaryActive, setSecondaryActive] = useState<Record<string, string>>({
    design: "tokens",
    engineering: "apis",
    product: "roadmap",
  })

  const secondaryId = secondaryActive[primaryActive] || currentPrimary.secondary[0].id
  const currentSecondary = currentPrimary.secondary.find((t) => t.id === secondaryId)!

  function setSecondary(id: string) {
    setSecondaryActive((prev) => ({ ...prev, [primaryActive]: id }))
  }

  return (
    <div className="flex min-h-[300px] items-start justify-center bg-muted/40 p-6 md:p-12">
      <div className="w-full max-w-lg">
        <div className="relative flex border-b border-border">
          {primaryTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setPrimaryActive(tab.id)}
              className={`relative px-4 py-2.5 text-sm font-semibold tracking-tight transition-colors ${
                primaryActive === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"
              }`}
            >
              {tab.label}
              {primaryActive === tab.id && (
                <motion.div
                  layoutId="tabs-09-primary"
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-foreground"
                  transition={spring}
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={primaryActive}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="flex gap-1 pt-3">
              {currentPrimary.secondary.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSecondary(tab.id)}
                  className={`relative rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    secondaryId === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"
                  }`}
                >
                  {secondaryId === tab.id && (
                    <motion.div
                      layoutId="tabs-09-secondary"
                      className="absolute inset-0 rounded-md bg-muted"
                      transition={spring}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={secondaryId}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={spring}
                className="pt-4"
              >
                <p className="text-sm leading-relaxed text-muted-foreground">{currentSecondary.content}</p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
