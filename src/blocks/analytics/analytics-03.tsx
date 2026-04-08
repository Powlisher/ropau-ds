"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"

const cohorts = [
  { week: "Jan 6", users: 482, retention: [100, 68, 52, 41, 35, 29, 24] },
  { week: "Jan 13", users: 537, retention: [100, 72, 55, 43, 37, 31] },
  { week: "Jan 20", users: 491, retention: [100, 65, 49, 38, 32] },
  { week: "Jan 27", users: 612, retention: [100, 71, 54, 42] },
  { week: "Feb 3", users: 558, retention: [100, 69, 51] },
  { week: "Feb 10", users: 603, retention: [100, 74] },
  { week: "Feb 17", users: 524, retention: [100] },
]

const weekLabels = ["W0", "W1", "W2", "W3", "W4", "W5", "W6"]

function getCellColor(value: number): string {
  if (value >= 70) return "oklch(0.55 0.15 160 / 0.7)"
  if (value >= 50) return "oklch(0.55 0.15 160 / 0.5)"
  if (value >= 35) return "oklch(0.55 0.15 160 / 0.3)"
  if (value >= 20) return "oklch(0.55 0.15 160 / 0.15)"
  return "oklch(0.55 0.15 160 / 0.06)"
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const rowVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Analytics03() {
  return (
    <Card
      style={{
        boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold tracking-tight">Cohort Retention</CardTitle>
        <CardDescription>Weekly user retention by signup cohort</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="min-w-[540px]">
          <div className="grid grid-cols-[100px_60px_repeat(7,1fr)] gap-1 text-center">
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground text-left">
              Cohort
            </div>
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Users
            </div>
            {weekLabels.map((w) => (
              <div key={w} className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {w}
              </div>
            ))}
          </div>

          <motion.div
            className="mt-2 space-y-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {cohorts.map((cohort) => (
              <motion.div
                key={cohort.week}
                variants={rowVariants}
                className="grid grid-cols-[100px_60px_repeat(7,1fr)] gap-1 items-center"
              >
                <span className="text-xs font-medium text-foreground">{cohort.week}</span>
                <span className="text-xs font-medium tabular-nums text-center text-muted-foreground">
                  {cohort.users}
                </span>
                {weekLabels.map((_, wi) => {
                  const value = cohort.retention[wi]
                  if (value === undefined) {
                    return <div key={wi} />
                  }
                  return (
                    <motion.div
                      key={wi}
                      className="flex h-8 items-center justify-center rounded-md text-xs font-medium tabular-nums"
                      style={{
                        backgroundColor: getCellColor(value),
                        color: value >= 50 ? "white" : undefined,
                      }}
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                    >
                      {value}%
                    </motion.div>
                  )
                })}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}
