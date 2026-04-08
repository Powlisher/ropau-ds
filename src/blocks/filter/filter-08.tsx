"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Section = {
  id: string
  title: string
  items: { id: string; label: string; count: number }[]
}

const sections: Section[] = [
  {
    id: "platform",
    title: "Platform",
    items: [
      { id: "web", label: "Web", count: 156 },
      { id: "ios", label: "iOS", count: 89 },
      { id: "android", label: "Android", count: 74 },
      { id: "desktop", label: "Desktop", count: 32 },
    ],
  },
  {
    id: "framework",
    title: "Framework",
    items: [
      { id: "react", label: "React", count: 201 },
      { id: "vue", label: "Vue.js", count: 67 },
      { id: "svelte", label: "Svelte", count: 28 },
      { id: "angular", label: "Angular", count: 45 },
      { id: "solid", label: "SolidJS", count: 14 },
    ],
  },
  {
    id: "license",
    title: "License",
    items: [
      { id: "mit", label: "MIT", count: 312 },
      { id: "apache", label: "Apache 2.0", count: 98 },
      { id: "gpl", label: "GPL v3", count: 54 },
      { id: "bsd", label: "BSD", count: 23 },
    ],
  },
  {
    id: "language",
    title: "Language",
    items: [
      { id: "typescript", label: "TypeScript", count: 278 },
      { id: "javascript", label: "JavaScript", count: 189 },
      { id: "rust", label: "Rust", count: 43 },
      { id: "go", label: "Go", count: 61 },
    ],
  },
]

export default function Filter08() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ platform: true, framework: true })
  const [checked, setChecked] = useState<Record<string, boolean>>({ web: true, react: true, typescript: true })

  function toggleSection(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function toggleItem(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const activeCount = Object.values(checked).filter(Boolean).length

  return (
    <div className="mx-auto w-64">
      <div
        className="rounded-xl bg-card ring-1 ring-foreground/[0.06]"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="font-heading text-sm font-semibold tracking-tight">Filters</h3>
          {activeCount > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setChecked({})}>
              Clear ({activeCount})
            </Button>
          )}
        </div>

        <div className="divide-y">
          {sections.map((section) => (
            <div key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-muted/50"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {section.title}
                </span>
                <motion.div
                  animate={{ rotate: expanded[section.id] ? 180 : 0 }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                >
                  <ChevronDownIcon className="size-4 text-muted-foreground" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expanded[section.id] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-0.5 px-4 pb-3">
                      {section.items.map((item) => (
                        <label
                          key={item.id}
                          className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-muted"
                        >
                          <Checkbox
                            checked={!!checked[item.id]}
                            onCheckedChange={() => toggleItem(item.id)}
                          />
                          <span className="flex-1 text-sm">{item.label}</span>
                          <span className="font-mono text-[11px] tabular-nums text-muted-foreground/50">{item.count}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
