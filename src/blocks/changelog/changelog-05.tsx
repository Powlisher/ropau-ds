"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const comparisons = [
  {
    version: "5.0",
    date: "Mar 2026",
    title: "Navigation redesign",
    before: {
      label: "Before",
      description: "Flat sidebar with 18 top-level items. Users reported taking 4+ clicks to reach nested settings.",
      gradient: "linear-gradient(135deg, oklch(0.93 0.01 15) 0%, oklch(0.90 0.02 25) 100%)",
    },
    after: {
      label: "After",
      description: "Collapsible sections with pinned favorites. Average navigation depth reduced to 1.7 clicks.",
      gradient: "linear-gradient(135deg, oklch(0.93 0.02 145) 0%, oklch(0.90 0.03 160) 100%)",
    },
  },
  {
    version: "4.8",
    date: "Feb 2026",
    title: "Table performance",
    before: {
      label: "Before",
      description: "Full DOM rendering for all rows. Tables with 5,000+ rows caused visible lag and 2.3s input delay.",
      gradient: "linear-gradient(135deg, oklch(0.93 0.01 15) 0%, oklch(0.90 0.02 25) 100%)",
    },
    after: {
      label: "After",
      description: "Virtualized rendering with 60fps scrolling. Tested stable at 100k rows with sub-16ms frame times.",
      gradient: "linear-gradient(135deg, oklch(0.93 0.02 145) 0%, oklch(0.90 0.03 160) 100%)",
    },
  },
  {
    version: "4.6",
    date: "Jan 2026",
    title: "Onboarding flow",
    before: {
      label: "Before",
      description: "7-step wizard with 62% drop-off at step 3. Required email verification before any product interaction.",
      gradient: "linear-gradient(135deg, oklch(0.93 0.01 15) 0%, oklch(0.90 0.02 25) 100%)",
    },
    after: {
      label: "After",
      description: "3-step progressive setup. Users reach their first project in under 90 seconds. Drop-off reduced to 23%.",
      gradient: "linear-gradient(135deg, oklch(0.93 0.02 145) 0%, oklch(0.90 0.03 160) 100%)",
    },
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Changelog05() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl"
    >
      <div className="mb-10">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">Before & after</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Measurable improvements, side by side.
        </p>
      </div>

      <div className="space-y-8">
        {comparisons.map((item) => (
          <motion.div
            key={item.version}
            variants={itemVariants}
            className="rounded-2xl bg-card p-6 ring-1 ring-foreground/[0.06]"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <div className="mb-5 flex items-center gap-2.5">
              <Badge variant="secondary" className="font-mono text-xs tabular-nums">
                v{item.version}
              </Badge>
              <span className="text-xs text-muted-foreground">{item.date}</span>
              <span className="text-muted-foreground/40">·</span>
              <span className="font-heading text-sm font-semibold tracking-tight">{item.title}</span>
            </div>

            <div className="grid items-stretch gap-4 sm:grid-cols-[1fr_auto_1fr]">
              <div
                className="flex flex-col justify-between rounded-xl p-5"
                style={{ background: item.before.gradient }}
              >
                <span className="mb-3 text-xs font-semibold tracking-[0.1em] uppercase" style={{ color: "oklch(0.55 0.08 25)" }}>
                  {item.before.label}
                </span>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {item.before.description}
                </p>
              </div>

              <div className="hidden items-center sm:flex">
                <ArrowRight className="size-4 text-muted-foreground/40" />
              </div>

              <div
                className="flex flex-col justify-between rounded-xl p-5"
                style={{ background: item.after.gradient }}
              >
                <span className="mb-3 text-xs font-semibold tracking-[0.1em] uppercase" style={{ color: "oklch(0.45 0.10 145)" }}>
                  {item.after.label}
                </span>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {item.after.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
