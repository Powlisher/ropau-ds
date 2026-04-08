"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"

const stages = [
  { label: "Visitors", value: 12847, color: "oklch(0.55 0.18 250)" },
  { label: "Sign-ups", value: 3921, color: "oklch(0.58 0.17 260)" },
  { label: "Activated", value: 2108, color: "oklch(0.62 0.16 270)" },
  { label: "Subscribed", value: 743, color: "oklch(0.55 0.15 160)" },
  { label: "Retained (90d)", value: 412, color: "oklch(0.60 0.18 145)" },
]

const maxValue = stages[0].value

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Analytics02() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Conversion Funnel</CardTitle>
        <CardDescription>Last 30 days acquisition pipeline</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stages.map((stage, i) => {
            const widthPercent = (stage.value / maxValue) * 100
            const conversionRate = i > 0
              ? ((stage.value / stages[i - 1].value) * 100).toFixed(1)
              : null
            return (
              <motion.div key={stage.label} variants={itemVariants}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{stage.label}</span>
                    {conversionRate && (
                      <span className="text-[10px] tabular-nums text-muted-foreground">
                        {conversionRate}% from prev
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-semibold tabular-nums">{stage.value.toLocaleString()}</span>
                </div>
                <div className="relative h-8 w-full overflow-hidden rounded-lg bg-muted/30">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-lg"
                    style={{ backgroundColor: stage.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${widthPercent}%` }}
                    transition={{ type: "spring" as const, stiffness: 60, damping: 18, delay: i * 0.08 }}
                  />
                </div>
                {i < stages.length - 1 && (
                  <div className="flex justify-center py-1">
                    <svg width="12" height="10" viewBox="0 0 12 10" className="text-muted-foreground/30">
                      <path d="M6 0L6 7M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>
        <div className="mt-5 flex items-center justify-between rounded-lg bg-muted/40 px-4 py-3">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Overall Conversion</span>
          <span className="text-lg font-semibold tabular-nums tracking-tight">
            {((stages[stages.length - 1].value / stages[0].value) * 100).toFixed(1)}%
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
