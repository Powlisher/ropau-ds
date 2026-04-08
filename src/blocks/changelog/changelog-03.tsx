"use client"

import { motion } from "framer-motion"
import { Circle } from "lucide-react"

const groups = [
  {
    date: "April 2026",
    items: [
      { text: "Role-based access controls now support nested team hierarchies", tag: "feature" },
      { text: "Email digest frequency is configurable per workspace", tag: "improvement" },
      { text: "Fixed timezone offset in scheduled report delivery", tag: "fix" },
    ],
  },
  {
    date: "March 2026",
    items: [
      { text: "Kanban view supports swimlanes grouped by assignee or priority", tag: "feature" },
      { text: "Bulk archive: select up to 500 items at once", tag: "improvement" },
      { text: "Corrected pagination cursor in the REST API for filtered queries", tag: "fix" },
      { text: "Markdown tables render correctly in the preview pane", tag: "fix" },
    ],
  },
  {
    date: "February 2026",
    items: [
      { text: "Introduced two-way sync with Google Calendar", tag: "feature" },
      { text: "Attachment upload limit raised from 25 MB to 100 MB on Pro plans", tag: "improvement" },
    ],
  },
]

const tagColors: Record<string, string> = {
  feature: "oklch(0.55 0.15 145)",
  improvement: "oklch(0.55 0.15 260)",
  fix: "oklch(0.55 0.15 25)",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Changelog03() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-xl"
    >
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">Updates</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">Grouped by month.</p>
      </div>

      <div className="space-y-8">
        {groups.map((group) => (
          <motion.div key={group.date} variants={itemVariants}>
            <h3 className="mb-3 text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
              {group.date}
            </h3>
            <div className="space-y-0 divide-y divide-border/60">
              {group.items.map((item) => (
                <div key={item.text} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                  <Circle
                    className="mt-1.5 size-2 shrink-0"
                    fill={tagColors[item.tag]}
                    stroke="none"
                  />
                  <span className="text-sm leading-relaxed text-foreground/90">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
