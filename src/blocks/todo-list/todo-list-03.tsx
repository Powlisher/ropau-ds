"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Clock, AlertTriangle } from "lucide-react"

const today = new Date("2026-04-08")

const initialTasks = [
  { id: "1", text: "Submit SOC 2 evidence package", due: "2026-04-05", done: false },
  { id: "2", text: "Review contract renewal for Helios account", due: "2026-04-07", done: false },
  { id: "3", text: "Deploy hotfix for timezone parsing bug", due: "2026-04-08", done: false },
  { id: "4", text: "Prepare board deck for Thursday meeting", due: "2026-04-10", done: false },
  { id: "5", text: "Run load test on new search endpoint", due: "2026-04-11", done: true },
  { id: "6", text: "Send swag to conference speakers", due: "2026-04-14", done: false },
  { id: "7", text: "Finalize partner integration docs", due: "2026-04-03", done: true },
]

function getDueStatus(due: string, done: boolean): { label: string; style: string; overdue: boolean } {
  if (done) return { label: "Done", style: "text-muted-foreground", overdue: false }
  const d = new Date(due)
  const diff = Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  if (diff < 0) return { label: `${Math.abs(diff)}d overdue`, style: "text-rose-600 font-medium", overdue: true }
  if (diff === 0) return { label: "Due today", style: "text-amber-600 font-medium", overdue: false }
  if (diff <= 2) return { label: `Due in ${diff}d`, style: "text-amber-600", overdue: false }
  return { label: new Date(due).toLocaleDateString("en-US", { month: "short", day: "numeric" }), style: "text-muted-foreground", overdue: false }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 320, damping: 26 } },
}

export default function TodoList03() {
  const [tasks, setTasks] = React.useState(initialTasks)

  const toggle = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const overdueCount = tasks.filter((t) => !t.done && getDueStatus(t.due, t.done).overdue).length

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
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-heading text-lg tracking-tight">Deadlines</CardTitle>
              <CardDescription>Tasks sorted by due date</CardDescription>
            </div>
            {overdueCount > 0 && (
              <Badge variant="destructive" className="gap-1 text-[11px]">
                <AlertTriangle className="size-3" />
                {overdueCount} overdue
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-0.5">
            {tasks
              .sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime())
              .map((task) => {
                const status = getDueStatus(task.due, task.done)

                return (
                  <motion.div
                    key={task.id}
                    variants={itemVariants}
                    className={`group flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-muted/50 ${
                      status.overdue ? "bg-rose-50/40 ring-1 ring-rose-200/50 rounded-lg" : ""
                    }`}
                  >
                    <Checkbox
                      checked={task.done}
                      onCheckedChange={() => toggle(task.id)}
                      className="size-[18px]"
                    />

                    <span className={`text-sm flex-1 ${task.done ? "text-muted-foreground line-through opacity-50" : "text-foreground"}`}>
                      {task.text}
                    </span>

                    <span className={`shrink-0 flex items-center gap-1 text-[11px] font-mono tabular-nums ${status.style}`}>
                      <Clock className="size-3" />
                      {status.label}
                    </span>
                  </motion.div>
                )
              })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
