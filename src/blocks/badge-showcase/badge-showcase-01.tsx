"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const statuses = [
  {
    label: "Deployed",
    variant: "default" as const,
    dot: "bg-emerald-400",
    bg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  },
  {
    label: "In review",
    variant: "secondary" as const,
    dot: "bg-amber-400",
    bg: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  },
  {
    label: "Failed",
    variant: "destructive" as const,
    dot: "bg-rose-400",
    bg: "bg-rose-500/10 text-rose-700 dark:text-rose-400",
  },
  {
    label: "Queued",
    variant: "outline" as const,
    dot: "bg-sky-400",
    bg: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
  },
  {
    label: "Archived",
    variant: "secondary" as const,
    dot: "bg-muted-foreground/40",
    bg: "bg-muted text-muted-foreground",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function BadgeShowcase01() {
  return (
    <div
      className="rounded-2xl bg-card p-8"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <h3 className="mb-1 text-sm font-semibold tracking-tight text-foreground">
        Status badges
      </h3>
      <p className="mb-6 text-xs text-muted-foreground">
        Semantic status indicators with dot notation
      </p>
      <motion.div
        className="flex flex-wrap gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {statuses.map((s) => (
          <motion.div key={s.label} variants={itemVariants}>
            <span
              className={`inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium ${s.bg}`}
            >
              <span className={`size-1.5 rounded-full ${s.dot}`} />
              {s.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
