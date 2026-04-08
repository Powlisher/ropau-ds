"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const tabs = [
  { id: "daily", label: "Daily", content: "3,847 active sessions with an average duration of 7m 23s. Peak usage at 10:15 AM and 2:40 PM across European timezones." },
  { id: "weekly", label: "Weekly", content: "Tuesday and Wednesday account for 41% of total weekly activity. Weekend usage dropped 18% compared to the previous month." },
  { id: "monthly", label: "Monthly", content: "28,419 unique visitors in March, up 12.3% from February. Retention rate stabilized at 67.8% after the onboarding redesign." },
]

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function Tabs02() {
  const [active, setActive] = useState(tabs[0].id)
  const activeTab = tabs.find((t) => t.id === active)!

  return (
    <div className="flex min-h-[240px] items-start justify-center bg-muted/40 p-6 md:p-12">
      <div className="w-full max-w-lg">
        <div className="inline-flex rounded-lg bg-muted p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`relative rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                active === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"
              }`}
            >
              {active === tab.id && (
                <motion.div
                  layoutId="tabs-02-pill"
                  className="absolute inset-0 rounded-md bg-card"
                  style={{
                    boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                  }}
                  transition={spring}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
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
