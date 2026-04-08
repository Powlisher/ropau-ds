"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const tabs = [
  {
    id: "revenue",
    label: "Revenue",
    metric: "$142.8K",
    delta: "+12.3%",
    positive: true,
    description: "Monthly recurring revenue across 847 active subscriptions. Enterprise tier contributes 61% of total, up from 54% last quarter.",
  },
  {
    id: "users",
    label: "Users",
    metric: "14,219",
    delta: "+8.7%",
    positive: true,
    description: "Weekly active users measured by at least one authenticated session. Organic signups account for 73% of new registrations this month.",
  },
  {
    id: "churn",
    label: "Churn",
    metric: "3.2%",
    delta: "-0.4pp",
    positive: true,
    description: "Monthly logo churn rate stabilizing after the onboarding redesign. Voluntary churn at 2.1%, involuntary (failed payments) at 1.1%.",
  },
  {
    id: "nps",
    label: "NPS",
    metric: "67",
    delta: "-3",
    positive: false,
    description: "Net Promoter Score from 1,240 responses collected in March. Promoters at 74%, passives at 19%, detractors at 7%. Mobile experience cited in 40% of detractor verbatims.",
  },
]

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

const contentVariants = {
  enter: { opacity: 0, y: 20, scale: 0.98 },
  center: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.98 },
}

export default function Tabs10() {
  const [active, setActive] = useState(tabs[0].id)
  const activeTab = tabs.find((t) => t.id === active)!

  return (
    <div className="flex min-h-[340px] items-start justify-center bg-muted/40 p-6 md:p-12">
      <div className="w-full max-w-lg">
        <div className="inline-flex rounded-lg bg-muted p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`relative rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors ${
                active === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"
              }`}
            >
              {active === tab.id && (
                <motion.div
                  layoutId="tabs-10-pill"
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
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={spring}
            className="mt-5"
          >
            <Card>
              <CardContent className="p-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-semibold tracking-tight tabular-nums text-foreground">
                    {activeTab.metric}
                  </span>
                  <span className={`text-sm font-medium tabular-nums ${activeTab.positive ? "text-emerald-600" : "text-red-500"}`}>
                    {activeTab.delta}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{activeTab.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
