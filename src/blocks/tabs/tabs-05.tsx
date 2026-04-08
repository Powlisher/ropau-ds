"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

const tabs = [
  { id: "inbox", label: "Inbox", count: 14, content: "14 unread messages. Latest from Priya Shankar regarding the API migration timeline, and 3 mentions in the design review thread from yesterday." },
  { id: "assigned", label: "Assigned", count: 7, content: "7 open tasks across 3 projects. Highest priority: finalize component token mapping for the design system, due Thursday." },
  { id: "watching", label: "Watching", count: 23, content: "23 threads with recent activity. The infrastructure cost discussion has 6 new replies since your last visit. Two PRs you reviewed were merged." },
  { id: "archived", label: "Archived", count: 0, content: "No recently archived items. Items move here automatically 30 days after resolution, or when manually archived from any view." },
]

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function Tabs05() {
  const [active, setActive] = useState(tabs[0].id)
  const activeTab = tabs.find((t) => t.id === active)!

  return (
    <div className="flex min-h-[240px] items-start justify-center bg-muted/40 p-6 md:p-12">
      <div className="w-full max-w-lg">
        <div className="relative flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                active === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <Badge
                  variant={active === tab.id ? "default" : "secondary"}
                  className="h-[18px] min-w-[18px] justify-center px-1.5 text-[10px] tabular-nums font-semibold"
                >
                  {tab.count}
                </Badge>
              )}
              {active === tab.id && (
                <motion.div
                  layoutId="tabs-05-indicator"
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-foreground"
                  transition={spring}
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={spring}
            className="pt-5"
          >
            <p className="text-sm leading-relaxed text-muted-foreground">{activeTab.content}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
