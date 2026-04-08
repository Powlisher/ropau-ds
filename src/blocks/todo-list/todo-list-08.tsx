"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { Circle, CheckCircle2, TrendingUp } from "lucide-react"

const initialTasks = [
  { id: "1", text: "Migrate CI pipeline to GitHub Actions", done: true },
  { id: "2", text: "Implement row-level security policies", done: true },
  { id: "3", text: "Add OpenGraph meta tags to all pages", done: true },
  { id: "4", text: "Set up automated database backups", done: false },
  { id: "5", text: "Configure CDN caching headers for static assets", done: false },
  { id: "6", text: "Audit npm dependencies for known vulns", done: false },
  { id: "7", text: "Create runbook for on-call rotation", done: false },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 320, damping: 26 } },
}

export default function TodoList08() {
  const [tasks, setTasks] = React.useState(initialTasks)

  const toggle = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const doneCount = tasks.filter((t) => t.done).length
  const total = tasks.length
  const progress = (doneCount / total) * 100

  const segments = tasks.map((t) => t.done)

  return (
    <motion.div
      className="mx-auto max-w-lg py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card
        style={{
          boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="font-heading text-lg tracking-tight">Sprint Progress</CardTitle>
              <CardDescription>Week 14 -- Infrastructure hardening</CardDescription>
            </div>
            <div className="text-right">
              <div className="font-heading text-3xl font-bold tabular-nums tracking-tight text-foreground">
                {doneCount}
                <span className="text-lg font-normal text-muted-foreground">/{total}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-600">
                <TrendingUp className="size-3" />
                <span className="font-mono tabular-nums">{progress.toFixed(0)}%</span>
              </div>
            </div>
          </div>

          <motion.div variants={itemVariants} className="mt-3 flex gap-1">
            {segments.map((done, i) => (
              <motion.div
                key={i}
                className={`h-2 flex-1 rounded-full ${done ? "bg-emerald-500" : "bg-muted"}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ type: "spring" as const, stiffness: 200, damping: 20, delay: i * 0.05 }}
                style={{ originX: 0 }}
              />
            ))}
          </motion.div>
        </CardHeader>

        <CardContent>
          <div className="space-y-0.5">
            {tasks.map((task, i) => (
              <motion.div
                key={task.id}
                variants={itemVariants}
                layout
                className="group flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-muted/50"
              >
                <Checkbox
                  checked={task.done}
                  onCheckedChange={() => toggle(task.id)}
                  className="size-[18px]"
                />

                <span className={`text-sm flex-1 ${task.done ? "text-muted-foreground line-through opacity-50" : "text-foreground"}`}>
                  {task.text}
                </span>

                <span className="text-[10px] font-mono tabular-nums text-muted-foreground/40">
                  {i + 1}
                </span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
