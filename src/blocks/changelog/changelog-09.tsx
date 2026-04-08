"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Check, Flag, Loader2 } from "lucide-react"

const milestones = [
  {
    label: "Q1 2026",
    title: "Foundation",
    status: "complete" as const,
    progress: 100,
    entries: [
      "Core API redesign with versioned endpoints",
      "Database migration to distributed Postgres (Citus)",
      "Launched developer documentation portal",
    ],
  },
  {
    label: "Q2 2026",
    title: "Collaboration",
    status: "in-progress" as const,
    progress: 67,
    entries: [
      "Real-time cursors and presence indicators",
      "Threaded comments on any entity",
      "Guest access with scoped permissions (in progress)",
    ],
  },
  {
    label: "Q3 2026",
    title: "Intelligence",
    status: "upcoming" as const,
    progress: 0,
    entries: [
      "AI-powered workflow suggestions",
      "Anomaly detection on project metrics",
      "Natural language query builder",
    ],
  },
]

const statusConfig = {
  complete: { icon: Check, color: "oklch(0.55 0.15 145)", bg: "oklch(0.94 0.04 145)" },
  "in-progress": { icon: Loader2, color: "oklch(0.55 0.15 260)", bg: "oklch(0.94 0.04 260)" },
  upcoming: { icon: Flag, color: "oklch(0.55 0.06 0)", bg: "oklch(0.94 0.01 0)" },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Changelog09() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-3xl"
    >
      <div className="mb-10">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">Roadmap progress</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          What we've shipped, what we're building, and what's next.
        </p>
      </div>

      <div className="space-y-6">
        {milestones.map((milestone) => {
          const config = statusConfig[milestone.status]
          const Icon = config.icon
          return (
            <motion.div
              key={milestone.label}
              variants={itemVariants}
              className="rounded-2xl bg-card p-6 ring-1 ring-foreground/[0.06]"
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex size-8 items-center justify-center rounded-lg"
                    style={{ backgroundColor: config.bg }}
                  >
                    <Icon
                      className={`size-4 ${milestone.status === "in-progress" ? "animate-spin" : ""}`}
                      style={{ color: config.color }}
                      strokeWidth={2.5}
                    />
                  </div>
                  <div>
                    <span className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                      {milestone.label}
                    </span>
                    <h3 className="font-heading text-base font-semibold tracking-tight">
                      {milestone.title}
                    </h3>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="font-mono text-xs tabular-nums"
                  style={{ backgroundColor: config.bg, color: config.color }}
                >
                  {milestone.progress}%
                </Badge>
              </div>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: config.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${milestone.progress}%` }}
                  transition={{ type: "spring" as const, stiffness: 80, damping: 20, delay: 0.3 }}
                />
              </div>

              <ul className="mt-4 space-y-2">
                {milestone.entries.map((entry) => (
                  <li key={entry} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/85">
                    <span className="mt-2 block size-1 shrink-0 rounded-full bg-foreground/20" />
                    {entry}
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
