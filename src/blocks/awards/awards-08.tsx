"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FlameIcon, CalendarIcon, ZapIcon } from "lucide-react"

const dailyStreak = [true, true, true, true, true, false, false]
const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const streaks = [
  { label: "Current Streak", value: 23, unit: "days", icon: FlameIcon, color: "text-orange-500" },
  { label: "Longest Streak", value: 47, unit: "days", icon: ZapIcon, color: "text-amber-500" },
  { label: "This Month", value: 18, unit: "of 30", icon: CalendarIcon, color: "text-primary" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const spring = { type: "spring" as const, stiffness: 400, damping: 25 }

const weekHistory = [
  [1, 1, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 0, 0],
]

export default function Awards08() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-orange-500/10">
              <FlameIcon className="size-6 text-orange-500" />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                Your Streak
              </h2>
              <p className="text-sm text-muted-foreground">Keep the momentum going, you are on fire.</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-3">
          {streaks.map((streak) => {
            const Icon = streak.icon
            return (
              <motion.div key={streak.label} whileHover={{ y: -2 }} transition={spring}>
                <Card
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
                  }}
                >
                  <CardContent className="flex items-center gap-4 py-5">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                      <Icon className={`size-5 ${streak.color}`} />
                    </div>
                    <div>
                      <div className="font-mono text-2xl font-bold tabular-nums tracking-tight">
                        {streak.value}
                        <span className="ml-1 text-xs font-normal tracking-wide text-muted-foreground">
                          {streak.unit}
                        </span>
                      </div>
                      <div className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                        {streak.label}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
            }}
          >
            <CardContent className="space-y-5 py-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  This Week
                </h3>
                <Badge className="bg-orange-500/10 text-orange-600 hover:bg-orange-500/10">
                  5 / 7 days
                </Badge>
              </div>
              <div className="flex justify-between gap-2">
                {dayLabels.map((day, i) => (
                  <div key={day} className="flex flex-col items-center gap-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" as const, stiffness: 300, damping: 20, delay: i * 0.05 }}
                      className={`flex size-10 items-center justify-center rounded-xl sm:size-12 ${
                        dailyStreak[i]
                          ? "bg-orange-500/10 ring-2 ring-orange-500/20"
                          : "bg-muted"
                      }`}
                    >
                      {dailyStreak[i] ? (
                        <FlameIcon className="size-5 text-orange-500" />
                      ) : (
                        <div className="size-2 rounded-full bg-muted-foreground/20" />
                      )}
                    </motion.div>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                      {day}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-border" />

              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Past 4 Weeks
                </h3>
                <div className="space-y-1.5">
                  {weekHistory.map((week, wi) => (
                    <div key={wi} className="flex gap-1.5">
                      {week.map((active, di) => (
                        <div
                          key={di}
                          className={`h-3 flex-1 rounded-sm ${
                            active ? "bg-orange-500/30" : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}
