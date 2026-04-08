"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Check, Flag } from "lucide-react"

const milestones = [
  { label: "Project Kickoff", target: "Jan 8", completed: "Jan 8", done: true },
  { label: "Research & Discovery", target: "Jan 22", completed: "Jan 24", done: true },
  { label: "Wireframes Approved", target: "Feb 5", completed: "Feb 3", done: true },
  { label: "Design System Tokens", target: "Feb 19", completed: "Feb 20", done: true },
  { label: "Frontend Prototype", target: "Mar 5", completed: "Mar 8", done: true },
  { label: "API Integration", target: "Mar 19", completed: null, done: false },
  { label: "QA & Accessibility Audit", target: "Apr 2", completed: null, done: false },
  { label: "Staging Deploy", target: "Apr 9", completed: null, done: false },
  { label: "Client Review", target: "Apr 16", completed: null, done: false },
  { label: "Production Launch", target: "Apr 23", completed: null, done: false },
]

const completedCount = milestones.filter((m) => m.done).length
const progress = (completedCount / milestones.length) * 100

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 320, damping: 26 } },
}

export default function Timeline09() {
  return (
    <motion.div
      className="mx-auto max-w-xl py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card
        style={{
          boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-heading text-lg tracking-tight">Website Redesign</CardTitle>
              <CardDescription>Acme Corp -- Q1/Q2 2026</CardDescription>
            </div>
            <div className="text-right">
              <div className="font-heading text-2xl font-semibold tabular-nums tracking-tight text-foreground">
                {completedCount}/{milestones.length}
              </div>
              <div className="text-xs text-muted-foreground">milestones</div>
            </div>
          </div>

          <motion.div variants={itemVariants} className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-muted-foreground">Overall Progress</span>
              <span className="text-xs font-mono tabular-nums font-medium text-foreground">{progress.toFixed(0)}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-foreground"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring" as const, stiffness: 60, damping: 18, delay: 0.3 }}
              />
            </div>
          </motion.div>
        </CardHeader>

        <CardContent>
          <div className="space-y-0">
            {milestones.map((m, i) => {
              const isCurrent = m.done === false && (i === 0 || milestones[i - 1].done)

              return (
                <motion.div
                  key={m.label}
                  variants={itemVariants}
                  className={`flex items-center gap-3 rounded-lg py-2.5 px-2 ${isCurrent ? "bg-muted/60" : ""}`}
                >
                  <div className={`flex size-6 shrink-0 items-center justify-center rounded-full ${
                    m.done
                      ? "bg-emerald-500"
                      : isCurrent
                        ? "bg-foreground"
                        : "bg-muted"
                  }`}>
                    {m.done ? (
                      <Check className="size-3.5 text-white" />
                    ) : isCurrent ? (
                      <Flag className="size-3 text-background" />
                    ) : (
                      <span className="text-[9px] font-mono font-bold text-muted-foreground">{i + 1}</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className={`text-sm ${m.done ? "text-muted-foreground line-through" : isCurrent ? "font-semibold text-foreground" : "text-foreground"}`}>
                      {m.label}
                    </span>
                  </div>

                  <div className="shrink-0 text-right">
                    {m.completed ? (
                      <span className="text-[11px] font-mono tabular-nums text-muted-foreground">
                        {m.completed}
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono tabular-nums text-muted-foreground/60">
                        {m.target}
                      </span>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
