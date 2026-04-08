"use client"

import { motion } from "framer-motion"

const columns = [
  {
    id: "ideas",
    title: "Ideas",
    color: "oklch(0.65 0.14 250)",
    items: [
      "AI-powered search suggestions",
      "Team activity heatmap",
      "Voice notes in comments",
      "Customizable keyboard shortcuts",
      "Browser extension for quick capture",
    ],
  },
  {
    id: "next",
    title: "Next Up",
    color: "oklch(0.7 0.16 55)",
    items: [
      "Multi-workspace switching",
      "Inline image annotations",
      "Recurring task templates",
    ],
  },
  {
    id: "doing",
    title: "Doing",
    color: "oklch(0.6 0.18 330)",
    items: [
      "Real-time presence indicators",
      "Drag and drop file attachments",
    ],
  },
  {
    id: "shipped",
    title: "Shipped",
    color: "oklch(0.65 0.18 155)",
    items: [
      "Dark mode support",
      "CSV export for all reports",
      "Two-factor authentication",
      "Email digest preferences",
      "Markdown editing toolbar",
      "Custom project icons",
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const colVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Kanban08() {
  return (
    <motion.div className="flex gap-5 overflow-x-auto pb-4" variants={containerVariants} initial="hidden" animate="visible">
      {columns.map((col) => (
        <motion.div key={col.id} variants={colVariants} className="w-64 shrink-0">
          <div className="mb-3 flex items-center gap-2">
            <div className="size-2 rounded-full" style={{ backgroundColor: col.color }} />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">{col.title}</h3>
            <span className="ml-auto font-mono text-[10px] tabular-nums text-muted-foreground">{col.items.length}</span>
          </div>
          <div className="space-y-0.5">
            {col.items.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ x: 3 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                className="group cursor-default rounded-lg px-3 py-2 transition-colors hover:bg-muted/60"
              >
                <p className="text-sm leading-snug text-foreground/80 group-hover:text-foreground">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
