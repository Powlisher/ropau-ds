"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"

type Priority = "high" | "medium" | "low"

const priorityStyles: Record<Priority, { dot: string; ring: string; label: string }> = {
  high: { dot: "bg-rose-500", ring: "ring-rose-100", label: "High" },
  medium: { dot: "bg-amber-500", ring: "ring-amber-100", label: "Medium" },
  low: { dot: "bg-slate-400", ring: "ring-slate-100", label: "Low" },
}

const initialTasks = [
  { id: "1", text: "Patch critical auth bypass in session handler", priority: "high" as Priority, done: false },
  { id: "2", text: "Migrate payment webhooks to v3 endpoint", priority: "high" as Priority, done: false },
  { id: "3", text: "Update onboarding email copy for EU market", priority: "medium" as Priority, done: true },
  { id: "4", text: "Add rate limiting to public GraphQL endpoint", priority: "high" as Priority, done: false },
  { id: "5", text: "Refactor notification preferences schema", priority: "medium" as Priority, done: false },
  { id: "6", text: "Archive stale feature flag definitions", priority: "low" as Priority, done: true },
  { id: "7", text: "Review pull request for CSV export feature", priority: "medium" as Priority, done: false },
  { id: "8", text: "Update Storybook examples for Button variants", priority: "low" as Priority, done: false },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 320, damping: 26 } },
}

export default function TodoList02() {
  const [tasks, setTasks] = React.useState(initialTasks)

  const toggle = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const grouped = {
    high: tasks.filter((t) => t.priority === "high"),
    medium: tasks.filter((t) => t.priority === "medium"),
    low: tasks.filter((t) => t.priority === "low"),
  }

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
          <CardTitle className="font-heading text-lg tracking-tight">Priority Queue</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          {(["high", "medium", "low"] as Priority[]).map((priority) => {
            const items = grouped[priority]
            const config = priorityStyles[priority]

            return (
              <motion.div key={priority} variants={itemVariants}>
                <div className="mb-2 flex items-center gap-2">
                  <div className={`size-2 rounded-full ${config.dot}`} />
                  <span className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                    {config.label} Priority
                  </span>
                  <span className="text-[11px] font-mono tabular-nums text-muted-foreground/60">
                    {items.filter((t) => t.done).length}/{items.length}
                  </span>
                </div>

                <div className="space-y-0.5">
                  {items.map((task) => (
                    <motion.div
                      key={task.id}
                      variants={itemVariants}
                      className={`group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/50 ${
                        !task.done && task.priority === "high" ? "bg-rose-50/50" : ""
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
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </CardContent>
      </Card>
    </motion.div>
  )
}
