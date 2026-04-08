"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const tabs = [
  { id: "details", label: "Details", content: "Project started on February 3rd with a 6-week timeline. Current sprint velocity at 34 points, tracking 8% ahead of the initial estimate." },
  { id: "members", label: "Members", content: "9 contributors across design, engineering, and product. Marcus Alvarez leads the backend track, while Amara Osei coordinates the component library." },
  { id: "files", label: "Files", content: "47 files uploaded, 12.8 GB total storage used. Most recent: brand-guidelines-v3.2.pdf added by Elara Fontaine on March 26 at 4:18 PM." },
  { id: "history", label: "History", content: "312 events logged. Last significant milestone: staging deployment on March 22. Three rollbacks in the past month, all resolved within 15 minutes." },
]

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function Tabs06() {
  const [active, setActive] = useState(tabs[0].id)
  const activeTab = tabs.find((t) => t.id === active)!

  return (
    <div className="flex min-h-[240px] items-start justify-center bg-muted/40 p-6 md:p-12">
      <div className="w-full max-w-lg">
        <div className="relative grid grid-cols-4 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`relative py-2.5 text-center text-sm font-medium transition-colors ${
                active === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"
              }`}
            >
              {tab.label}
              {active === tab.id && (
                <motion.div
                  layoutId="tabs-06-indicator"
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
