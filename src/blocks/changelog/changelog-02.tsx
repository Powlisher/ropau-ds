"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Bug, Sparkles, ArrowUpCircle } from "lucide-react"

const categories = {
  feature: { label: "Feature", icon: Sparkles, bg: "oklch(0.94 0.04 145)", text: "oklch(0.40 0.10 145)" },
  fix: { label: "Fix", icon: Bug, bg: "oklch(0.94 0.04 25)", text: "oklch(0.45 0.12 25)" },
  improvement: { label: "Improvement", icon: ArrowUpCircle, bg: "oklch(0.94 0.04 260)", text: "oklch(0.42 0.12 260)" },
} as const

const entries = [
  {
    title: "AI-powered search across all workspaces",
    description: "Natural language queries now return results from documents, tasks, and messages. Supports 14 languages with automatic detection.",
    category: "feature" as const,
    date: "Apr 2, 2026",
    version: "3.1.0",
  },
  {
    title: "Webhook delivery retry with exponential backoff",
    description: "Failed webhook deliveries now retry up to 5 times with configurable backoff. View delivery status in the developer console.",
    category: "improvement" as const,
    date: "Mar 29, 2026",
    version: "3.0.4",
  },
  {
    title: "OAuth token refresh race condition",
    description: "Resolved an issue where concurrent API calls could trigger duplicate token refreshes, causing intermittent 401 errors on mobile clients.",
    category: "fix" as const,
    date: "Mar 25, 2026",
    version: "3.0.3",
  },
  {
    title: "Custom fields on project templates",
    description: "Define up to 20 custom fields per template. Fields are inherited when creating a project from the template and can be overridden individually.",
    category: "feature" as const,
    date: "Mar 18, 2026",
    version: "3.0.2",
  },
  {
    title: "Dashboard widget load times reduced by 42%",
    description: "Switched to incremental data fetching for dashboard widgets. Charts now render progressively instead of waiting for all data.",
    category: "improvement" as const,
    date: "Mar 12, 2026",
    version: "3.0.1",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Changelog02() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-3xl"
    >
      <div className="mb-10">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">What&apos;s new</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Features, fixes, and improvements across the platform.
        </p>
      </div>

      <div className="grid gap-4">
        {entries.map((entry) => {
          const cat = categories[entry.category]
          const Icon = cat.icon
          return (
            <motion.div
              key={entry.version}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              className="rounded-xl bg-card p-5 ring-1 ring-foreground/[0.06]"
              style={{
                boxShadow:
                  "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
              }}
            >
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge
                  className="gap-1 text-xs font-medium"
                  style={{ backgroundColor: cat.bg, color: cat.text }}
                >
                  <Icon className="size-3" />
                  {cat.label}
                </Badge>
                <span className="font-mono text-xs tabular-nums text-muted-foreground">
                  v{entry.version}
                </span>
                <span className="text-muted-foreground/40">·</span>
                <span className="text-xs text-muted-foreground">{entry.date}</span>
              </div>

              <h3 className="mt-3 font-heading text-[15px] font-semibold tracking-tight">
                {entry.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {entry.description}
              </p>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
