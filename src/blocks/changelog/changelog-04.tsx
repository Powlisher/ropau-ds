"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const entries = [
  {
    version: "4.2.0",
    date: "Mar 31, 2026",
    title: "Redesigned analytics dashboard",
    description: "Completely rebuilt the analytics view with composable widgets, drag-to-rearrange layout, and 6 new chart types including funnel and cohort retention.",
    imageGradient: "linear-gradient(135deg, oklch(0.92 0.03 220) 0%, oklch(0.88 0.05 250) 100%)",
    imageLabel: "Analytics Dashboard",
  },
  {
    version: "4.1.0",
    date: "Mar 17, 2026",
    title: "Inline commenting on documents",
    description: "Select any text in a document to leave a threaded comment. Comments sync in real time and support @mentions with notification delivery.",
    imageGradient: "linear-gradient(135deg, oklch(0.92 0.03 145) 0%, oklch(0.88 0.05 165) 100%)",
    imageLabel: "Inline Comments",
  },
  {
    version: "4.0.0",
    date: "Feb 28, 2026",
    title: "Version 4: the permissions overhaul",
    description: "Fine-grained permissions at the folder, project, and field level. Define custom roles with granular scopes. Backward-compatible with existing team structures.",
    imageGradient: "linear-gradient(135deg, oklch(0.92 0.03 30) 0%, oklch(0.88 0.05 50) 100%)",
    imageLabel: "Permissions Editor",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 280, damping: 24 } },
}

export default function Changelog04() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-3xl"
    >
      <div className="mb-10">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">Product updates</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Major releases with visual previews.
        </p>
      </div>

      <div className="space-y-8">
        {entries.map((entry) => (
          <motion.article
            key={entry.version}
            variants={itemVariants}
            whileHover={{ y: -2 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className="overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/[0.06]"
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <div
              className="relative flex h-48 items-center justify-center overflow-hidden sm:h-56"
              style={{ background: entry.imageGradient }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(255,255,255,0.25),transparent_70%)]" />
              <div
                className="relative rounded-lg bg-white/60 px-6 py-3 text-sm font-medium tracking-tight text-foreground/70 backdrop-blur-sm ring-1 ring-white/40"
                style={{
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                {entry.imageLabel}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2.5">
                <Badge variant="secondary" className="font-mono text-xs tabular-nums">
                  v{entry.version}
                </Badge>
                <span className="text-xs text-muted-foreground">{entry.date}</span>
              </div>
              <h3 className="mt-3 font-heading text-lg font-semibold tracking-tight">
                {entry.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {entry.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  )
}
