"use client"

import { motion } from "framer-motion"

const releases = [
  {
    version: "1.12.0",
    date: "2026-04-04",
    changes: [
      "Added Zapier integration with 30+ trigger/action combinations",
      "Workspace usage metrics visible to all members (previously admin-only)",
      "Improved Markdown editor with slash commands",
    ],
  },
  {
    version: "1.11.3",
    date: "2026-03-28",
    changes: [
      "Fixed inconsistent sort order when grouping by custom field",
      "Corrected email template rendering on Outlook desktop clients",
    ],
  },
  {
    version: "1.11.0",
    date: "2026-03-15",
    changes: [
      "Two-factor authentication via hardware security keys (WebAuthn)",
      "Batch operations on the file manager: move, tag, delete up to 200 files",
      "Dark mode respects system preference by default",
      "API pagination now supports cursor-based traversal alongside offset",
    ],
  },
  {
    version: "1.10.1",
    date: "2026-03-03",
    changes: [
      "Resolved memory leak in the real-time presence indicator",
      "Fixed avatar upload failing silently on files above 4 MB",
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Changelog08() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-lg"
    >
      <h2 className="mb-8 font-heading text-2xl font-semibold tracking-tight">Changelog</h2>

      <div className="space-y-8">
        {releases.map((release) => (
          <motion.div key={release.version} variants={itemVariants}>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-sm font-semibold tabular-nums text-foreground">
                {release.version}
              </span>
              <span className="font-mono text-xs tabular-nums text-muted-foreground">
                {release.date}
              </span>
            </div>

            <ul className="mt-2.5 space-y-1.5">
              {release.changes.map((change) => (
                <li key={change} className="flex gap-2 text-sm leading-relaxed text-foreground/85">
                  <span className="mt-[9px] block size-1 shrink-0 rounded-full bg-foreground/20" />
                  {change}
                </li>
              ))}
            </ul>

            <div className="mt-5 h-px bg-border/60" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
