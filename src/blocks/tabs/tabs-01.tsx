"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const tabs = [
  { id: "overview", label: "Overview", content: "Platform analytics across 14 active workspaces. Revenue tracking, user engagement metrics, and conversion funnels updated in real-time with 5-minute granularity." },
  { id: "activity", label: "Activity", content: "237 events logged in the past 24 hours. Most active contributors: the design and engineering teams, with 89 commits and 34 design iterations pushed since Monday." },
  { id: "settings", label: "Settings", content: "Workspace configuration for notification preferences, API rate limits, team permissions, and billing cycle management. Last updated by Elara Fontaine on March 28." },
]

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function Tabs01() {
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
              className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
                active === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"
              }`}
            >
              {tab.label}
              {active === tab.id && (
                <motion.div
                  layoutId="tabs-01-indicator"
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
