"use client"

import { Badge } from "@/components/ui/badge"
import { CheckCircle2Icon, ArrowUpIcon } from "lucide-react"
import { motion } from "framer-motion"

const versions = [
  {
    version: "v3.2.1",
    label: "latest",
    date: "Apr 3, 2026",
    isLatest: true,
    breaking: false,
  },
  {
    version: "v3.1.0",
    label: "stable",
    date: "Mar 18, 2026",
    isLatest: false,
    breaking: false,
  },
  {
    version: "v3.0.0",
    label: "major",
    date: "Feb 27, 2026",
    isLatest: false,
    breaking: true,
  },
  {
    version: "v2.9.4",
    label: "legacy",
    date: "Jan 12, 2026",
    isLatest: false,
    breaking: false,
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

export default function BadgeShowcase07() {
  return (
    <div
      className="rounded-2xl bg-card p-8"
      style={{
        boxShadow:
          "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <h3 className="mb-1 text-sm font-semibold tracking-tight text-foreground">
        Version badges
      </h3>
      <p className="mb-6 text-xs text-muted-foreground">
        Release indicators with semantic context
      </p>
      <motion.ul
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {versions.map((v) => (
          <motion.li
            key={v.version}
            variants={itemVariants}
            className="flex items-center gap-3 rounded-lg bg-muted/40 px-4 py-3"
          >
            <span className="font-mono text-sm font-semibold tabular-nums text-foreground">
              {v.version}
            </span>
            <div className="flex items-center gap-1.5">
              {v.isLatest && (
                <Badge variant="default" className="h-[18px] text-[10px]">
                  <CheckCircle2Icon data-icon="inline-start" className="size-2.5" />
                  Latest
                </Badge>
              )}
              {v.breaking && (
                <span className="inline-flex h-[18px] items-center gap-1 rounded-full bg-amber-500/10 px-1.5 text-[10px] font-medium text-amber-700 dark:text-amber-400">
                  <ArrowUpIcon className="size-2.5" />
                  Breaking
                </span>
              )}
              {!v.isLatest && !v.breaking && (
                <Badge variant="secondary" className="h-[18px] text-[10px]">
                  {v.label}
                </Badge>
              )}
            </div>
            <span className="ml-auto text-xs tabular-nums text-muted-foreground">
              {v.date}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}
