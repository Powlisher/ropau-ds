"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { CheckCircle2Icon, CircleIcon, CircleDotIcon } from "lucide-react"

type Subtask = { title: string; done: boolean }

type Task = {
  id: string
  title: string
  category: string
  subtasks: Subtask[]
  dueLabel: string
}

type Column = {
  id: string
  title: string
  emoji: string
  color: string
  tasks: Task[]
}

const columns: Column[] = [
  {
    id: "today",
    title: "Today",
    emoji: "",
    color: "oklch(0.65 0.22 25)",
    tasks: [
      {
        id: "p1",
        title: "Prepare quarterly report",
        category: "Work",
        dueLabel: "Due today",
        subtasks: [
          { title: "Gather revenue data from Stripe", done: true },
          { title: "Create charts in spreadsheet", done: true },
          { title: "Write executive summary", done: false },
          { title: "Send to finance team for review", done: false },
        ],
      },
      {
        id: "p2",
        title: "Fix auth token refresh bug",
        category: "Engineering",
        dueLabel: "Due today",
        subtasks: [
          { title: "Reproduce in staging environment", done: true },
          { title: "Write failing test case", done: true },
          { title: "Implement fix in auth middleware", done: false },
        ],
      },
    ],
  },
  {
    id: "week",
    title: "This Week",
    emoji: "",
    color: "oklch(0.65 0.18 55)",
    tasks: [
      {
        id: "p3",
        title: "Redesign settings page",
        category: "Design",
        dueLabel: "Thu",
        subtasks: [
          { title: "Audit current page pain points", done: true },
          { title: "Create wireframes for new layout", done: false },
          { title: "Build prototype in Figma", done: false },
          { title: "Get feedback from 3 users", done: false },
          { title: "Hand off to engineering", done: false },
        ],
      },
      {
        id: "p4",
        title: "Update team handbook",
        category: "Admin",
        dueLabel: "Fri",
        subtasks: [
          { title: "Review outdated sections", done: false },
          { title: "Add new hire onboarding steps", done: false },
        ],
      },
    ],
  },
  {
    id: "later",
    title: "Later",
    emoji: "",
    color: "oklch(0.6 0.1 250)",
    tasks: [
      {
        id: "p5",
        title: "Learn Rust for backend services",
        category: "Learning",
        dueLabel: "No deadline",
        subtasks: [
          { title: "Complete Rustlings exercises", done: true },
          { title: "Build a CLI tool", done: false },
          { title: "Port a small service from Node", done: false },
        ],
      },
    ],
  },
]

const categoryColors: Record<string, string> = {
  Work: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Engineering: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  Design: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
  Admin: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  Learning: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
}

const premiumShadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const colVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Kanban06() {
  return (
    <motion.div className="flex gap-5 overflow-x-auto pb-4" variants={containerVariants} initial="hidden" animate="visible">
      {columns.map((column) => (
        <motion.div key={column.id} variants={colVariants} className="w-80 shrink-0">
          <div className="mb-3 flex items-center gap-2.5">
            <div className="size-2.5 rounded-full" style={{ backgroundColor: column.color }} />
            <h3 className="font-heading text-sm font-semibold tracking-tight text-foreground">{column.title}</h3>
            <span className="ml-auto font-mono text-xs tabular-nums text-muted-foreground">{column.tasks.length}</span>
          </div>

          <div className="space-y-3">
            {column.tasks.map((task) => {
              const done = task.subtasks.filter((s) => s.done).length
              const total = task.subtasks.length
              const pct = Math.round((done / total) * 100)

              return (
                <motion.div key={task.id} variants={cardVariants} whileHover={{ y: -2 }} transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}>
                  <Card className="border-border/40" style={{ boxShadow: premiumShadow }}>
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <p className="text-sm font-medium leading-snug text-foreground">{task.title}</p>
                        <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${categoryColors[task.category] ?? ""}`}>
                          {task.category}
                        </span>
                      </div>

                      <div className="mb-3 flex items-center gap-2">
                        <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: column.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ type: "spring" as const, stiffness: 200, damping: 20 }}
                          />
                        </div>
                        <span className="font-mono text-[10px] tabular-nums text-muted-foreground">{done}/{total}</span>
                      </div>

                      <div className="space-y-1.5">
                        {task.subtasks.map((sub, i) => (
                          <div key={i} className="flex items-center gap-2">
                            {sub.done ? (
                              <CheckCircle2Icon className="size-3.5 shrink-0 text-emerald-500" />
                            ) : pct > 0 && i === done ? (
                              <CircleDotIcon className="size-3.5 shrink-0" style={{ color: column.color }} />
                            ) : (
                              <CircleIcon className="size-3.5 shrink-0 text-muted-foreground/40" />
                            )}
                            <span className={`text-xs leading-snug ${sub.done ? "text-muted-foreground line-through" : "text-foreground"}`}>
                              {sub.title}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 border-t border-border/50 pt-2.5">
                        <span className="font-mono text-[10px] tabular-nums text-muted-foreground">{task.dueLabel}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
