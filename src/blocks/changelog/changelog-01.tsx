"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Rocket, Bug, Sparkles, Zap } from "lucide-react"

const entries = [
  {
    version: "2.4.0",
    date: "Mar 28, 2026",
    icon: Rocket,
    accent: "oklch(0.65 0.18 145)",
    items: [
      "Real-time collaboration now supports up to 24 concurrent editors",
      "Added CSV and Parquet export for analytics dashboards",
      "New keyboard shortcuts panel (press ? anywhere)",
    ],
  },
  {
    version: "2.3.2",
    date: "Mar 14, 2026",
    icon: Bug,
    accent: "oklch(0.65 0.18 25)",
    items: [
      "Fixed session timeout not respecting custom TTL on enterprise plans",
      "Resolved flickering on Safari 18.3 when toggling sidebar",
    ],
  },
  {
    version: "2.3.0",
    date: "Feb 27, 2026",
    icon: Sparkles,
    accent: "oklch(0.60 0.18 280)",
    items: [
      "Introduced smart filters: save, name, and share any filter combination",
      "Audit log now captures API key rotations and SSO config changes",
      "Table columns are resizable via drag handle",
    ],
  },
  {
    version: "2.2.1",
    date: "Feb 11, 2026",
    icon: Zap,
    accent: "oklch(0.68 0.16 55)",
    items: [
      "Performance: list rendering is 3.7x faster on datasets above 10k rows",
      "Reduced initial bundle size by 18% via dynamic imports",
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Changelog01() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl"
    >
      <div className="mb-10">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">Changelog</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          What we shipped, fixed, and improved — newest first.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-[17px] top-3 bottom-3 w-px bg-border" />

        <div className="space-y-10">
          {entries.map((entry) => {
            const Icon = entry.icon
            return (
              <motion.div key={entry.version} variants={itemVariants} className="relative flex gap-6">
                <div
                  className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full ring-4 ring-background"
                  style={{ backgroundColor: entry.accent }}
                >
                  <Icon className="size-4 text-white" strokeWidth={2.5} />
                </div>

                <div className="flex-1 pb-1">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="font-mono text-xs tabular-nums">
                      v{entry.version}
                    </Badge>
                    <span className="text-xs font-medium tracking-wide text-muted-foreground">
                      {entry.date}
                    </span>
                  </div>

                  <ul className="mt-3 space-y-2">
                    {entry.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-foreground/90">
                        <span className="mt-2 block size-1 shrink-0 rounded-full bg-foreground/25" />
                        {item}
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
