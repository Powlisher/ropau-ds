"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Rocket, Bug, Sparkles, Zap, Shield } from "lucide-react"

const releases = [
  {
    version: "3.2.0",
    date: "Apr 2, 2026",
    label: "Latest",
    icon: Sparkles,
    accent: "oklch(0.60 0.18 280)",
    changes: [
      { type: "feat", text: "Added real-time event streaming via WebSocket transport" },
      { type: "feat", text: "New batch analytics endpoint supports up to 50 concurrent queries" },
      { type: "fix", text: "Resolved timeout regression on connections >30s in Node 22" },
    ],
  },
  {
    version: "3.1.4",
    date: "Mar 19, 2026",
    icon: Shield,
    accent: "oklch(0.55 0.15 150)",
    changes: [
      { type: "security", text: "Patched CVE-2026-1847: token exposure in error logs" },
      { type: "fix", text: "Corrected rate limit header parsing for Cloudflare-proxied responses" },
    ],
  },
  {
    version: "3.1.0",
    date: "Mar 4, 2026",
    icon: Rocket,
    accent: "oklch(0.55 0.15 250)",
    changes: [
      { type: "feat", text: "TypeScript 5.7 strict mode support with narrowed generics" },
      { type: "feat", text: "Automatic retry with exponential backoff (configurable)" },
      { type: "perf", text: "37% smaller bundle via tree-shaking improvements" },
    ],
  },
  {
    version: "3.0.2",
    date: "Feb 14, 2026",
    icon: Bug,
    accent: "oklch(0.60 0.16 55)",
    changes: [
      { type: "fix", text: "Fixed pagination cursor not resetting on filter change" },
      { type: "fix", text: "Edge runtime compatibility for Vercel deployments" },
    ],
  },
]

const typeColors: Record<string, string> = {
  feat: "oklch(0.55 0.15 250)",
  fix: "oklch(0.55 0.15 25)",
  perf: "oklch(0.58 0.14 55)",
  security: "oklch(0.55 0.15 150)",
}

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

export default function Documentation07() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Release Notes
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Track every change shipped in @ropau/sdk — newest first.
        </p>
      </motion.div>

      <div className="relative">
        <div className="absolute left-[19px] top-3 bottom-3 w-px bg-border" />

        <div className="space-y-8">
          {releases.map((release) => {
            const Icon = release.icon
            return (
              <motion.div
                key={release.version}
                variants={itemVariants}
                className="relative flex gap-4"
              >
                <div
                  className="relative z-10 mt-1 flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full ring-4 ring-background"
                  style={{ backgroundColor: release.accent }}
                >
                  <Icon className="h-4 w-4 text-white" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-heading text-base font-semibold tracking-tight">
                      v{release.version}
                    </h3>
                    {release.label && (
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                        {release.label}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-0.5 font-mono text-[11px] tabular-nums tracking-wide text-muted-foreground">
                    {release.date}
                  </p>

                  <ul className="mt-3 space-y-2">
                    {release.changes.map((change, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span
                          className="mt-0.5 shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold tabular-nums text-white"
                          style={{ backgroundColor: typeColors[change.type] }}
                        >
                          {change.type}
                        </span>
                        <span className="text-sm leading-relaxed text-foreground/80">
                          {change.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
