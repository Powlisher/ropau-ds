"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const filterGroups = [
  {
    title: "Category",
    items: [
      { id: "frontend", label: "Frontend", count: 64 },
      { id: "backend", label: "Backend", count: 43 },
      { id: "devops", label: "DevOps", count: 21 },
      { id: "design", label: "Design", count: 38 },
      { id: "data", label: "Data Science", count: 12 },
    ],
  },
  {
    title: "Status",
    items: [
      { id: "published", label: "Published", count: 112 },
      { id: "draft", label: "Draft", count: 29 },
      { id: "review", label: "In Review", count: 17 },
      { id: "archived", label: "Archived", count: 8 },
    ],
  },
  {
    title: "Author",
    items: [
      { id: "claire", label: "Claire Fontaine", count: 23 },
      { id: "nicolas", label: "Nicolas Roux", count: 19 },
      { id: "amelie", label: "Amelie Bernard", count: 14 },
      { id: "thomas", label: "Thomas Mercier", count: 11 },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Filter02() {
  const [selected, setSelected] = useState<Record<string, boolean>>({
    frontend: true,
    published: true,
  })

  function toggle(id: string) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const activeCount = Object.values(selected).filter(Boolean).length

  return (
    <div
      className="mx-auto w-64 rounded-xl bg-card p-5 ring-1 ring-foreground/[0.06]"
      style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
    >
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-heading text-sm font-semibold tracking-tight">Filters</h3>
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={() => setSelected({})}>
            Clear ({activeCount})
          </Button>
        )}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {filterGroups.map((group) => (
          <motion.div key={group.title} variants={itemVariants}>
            <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {group.title}
            </h4>
            <div className="space-y-2">
              {group.items.map((item) => (
                <label
                  key={item.id}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted"
                >
                  <Checkbox
                    checked={!!selected[item.id]}
                    onCheckedChange={() => toggle(item.id)}
                  />
                  <span className="flex-1 text-sm">{item.label}</span>
                  <span className="font-mono text-xs tabular-nums text-muted-foreground/60">{item.count}</span>
                </label>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-6 pt-4 border-t">
        <Button className="w-full" size="sm">
          Apply filters
        </Button>
      </div>
    </div>
  )
}
