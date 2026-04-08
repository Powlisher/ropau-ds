"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart3Icon, UsersIcon, ZapIcon, GlobeIcon } from "lucide-react"

const tabs = [
  { id: "analytics", label: "Analytics", icon: BarChart3Icon, content: "Real-time dashboard tracking 14.2K daily active users across 8 regions. Conversion rate at 4.7%, with mobile sessions growing 23% quarter over quarter." },
  { id: "audience", label: "Audience", icon: UsersIcon, content: "Primary cohort: 25-34 year-olds representing 38% of total traffic. Enterprise accounts contribute 61% of revenue despite being only 12% of the user base." },
  { id: "performance", label: "Performance", icon: ZapIcon, content: "P95 response time at 142ms, down from 218ms after the CDN migration. Core Web Vitals all green. Lighthouse score averaging 94 across landing pages." },
  { id: "regions", label: "Regions", icon: GlobeIcon, content: "Europe accounts for 47% of traffic, North America 31%, and Asia-Pacific 18%. Latency improvements in Singapore reduced bounce rate by 9 percentage points." },
]

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function Tabs04() {
  const [active, setActive] = useState(tabs[0].id)
  const activeTab = tabs.find((t) => t.id === active)!

  return (
    <div className="flex min-h-[280px] items-start justify-center bg-muted/40 p-6 md:p-12">
      <div className="w-full max-w-lg">
        <div className="flex justify-center gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = active === tab.id
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`relative flex flex-col items-center gap-1.5 rounded-xl px-4 py-3 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground/70"
                }`}
                whileHover={{ y: -2 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="tabs-04-bg"
                    className="absolute inset-0 rounded-xl bg-primary/[0.06]"
                    transition={spring}
                  />
                )}
                <Icon className="relative z-10 size-5" />
                <span className="relative z-10 text-xs font-medium">{tab.label}</span>
              </motion.button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={spring}
            className="mt-6 rounded-xl border border-border bg-card p-5"
            style={{
              boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <h3 className="text-sm font-semibold tracking-tight text-foreground">{activeTab.label}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{activeTab.content}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
