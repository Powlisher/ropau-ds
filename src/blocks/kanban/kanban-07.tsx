"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { ClockIcon, AlertTriangleIcon } from "lucide-react"

type Task = {
  id: string
  title: string
  assignees: { initials: string; color: string }[]
  due: string
  overdue: boolean
  type: string
}

const columns = [
  {
    id: "open",
    title: "Open",
    color: "oklch(0.6 0.14 250)",
    tasks: [
      {
        id: "a1",
        title: "Implement search autocomplete with debounce",
        assignees: [
          { initials: "LM", color: "oklch(0.7 0.15 330)" },
          { initials: "AV", color: "oklch(0.65 0.15 250)" },
        ],
        due: "Apr 14",
        overdue: false,
        type: "Feature",
      },
      {
        id: "a2",
        title: "Add CSV import for user accounts",
        assignees: [{ initials: "SC", color: "oklch(0.7 0.14 155)" }],
        due: "Apr 16",
        overdue: false,
        type: "Feature",
      },
      {
        id: "a3",
        title: "Set up Datadog monitoring alerts",
        assignees: [{ initials: "JK", color: "oklch(0.7 0.12 55)" }],
        due: "Apr 11",
        overdue: true,
        type: "Ops",
      },
    ],
  },
  {
    id: "active",
    title: "Active",
    color: "oklch(0.7 0.18 55)",
    tasks: [
      {
        id: "a4",
        title: "Migrate from REST to GraphQL for user service",
        assignees: [
          { initials: "AV", color: "oklch(0.65 0.15 250)" },
          { initials: "JK", color: "oklch(0.7 0.12 55)" },
          { initials: "TR", color: "oklch(0.65 0.14 20)" },
        ],
        due: "Apr 18",
        overdue: false,
        type: "Refactor",
      },
      {
        id: "a5",
        title: "Fix memory leak in WebSocket handler",
        assignees: [{ initials: "AV", color: "oklch(0.65 0.15 250)" }],
        due: "Apr 9",
        overdue: true,
        type: "Bug",
      },
    ],
  },
  {
    id: "testing",
    title: "Testing",
    color: "oklch(0.6 0.15 290)",
    tasks: [
      {
        id: "a6",
        title: "End-to-end tests for billing upgrade flow",
        assignees: [
          { initials: "SC", color: "oklch(0.7 0.14 155)" },
          { initials: "LM", color: "oklch(0.7 0.15 330)" },
        ],
        due: "Apr 12",
        overdue: false,
        type: "QA",
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "oklch(0.65 0.18 155)",
    tasks: [
      {
        id: "a7",
        title: "Implement password complexity requirements",
        assignees: [{ initials: "TR", color: "oklch(0.65 0.14 20)" }],
        due: "Apr 6",
        overdue: false,
        type: "Security",
      },
      {
        id: "a8",
        title: "Add lazy loading to product image gallery",
        assignees: [{ initials: "LM", color: "oklch(0.7 0.15 330)" }],
        due: "Apr 7",
        overdue: false,
        type: "Perf",
      },
    ],
  },
]

const typeStyles: Record<string, string> = {
  Feature: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Bug: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  Refactor: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  Ops: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  QA: "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300",
  Security: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  Perf: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
}

const premiumShadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const colVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const cardV = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Kanban07() {
  return (
    <motion.div className="flex gap-5 overflow-x-auto pb-4" variants={containerVariants} initial="hidden" animate="visible">
      {columns.map((col) => (
        <motion.div key={col.id} variants={colVariants} className="w-76 shrink-0">
          <div className="mb-3 flex items-center gap-2">
            <div className="size-2.5 rounded-full" style={{ backgroundColor: col.color }} />
            <h3 className="text-sm font-semibold tracking-tight text-foreground">{col.title}</h3>
            <span className="ml-auto font-mono text-xs tabular-nums text-muted-foreground">{col.tasks.length}</span>
          </div>
          <div className="space-y-2.5">
            {col.tasks.map((task) => (
              <motion.div key={task.id} variants={cardV} whileHover={{ y: -2 }} transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}>
                <Card className="border-border/40" style={{ boxShadow: premiumShadow }}>
                  <CardContent className="p-3.5">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${typeStyles[task.type] ?? ""}`}>
                        {task.type}
                      </span>
                    </div>
                    <p className="mb-3 text-sm font-medium leading-snug text-foreground">{task.title}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-1.5">
                        {task.assignees.map((a, i) => (
                          <Avatar key={i} size="sm" className="ring-2 ring-card">
                            <AvatarFallback className="text-[9px]" style={{ backgroundColor: a.color, color: "white" }}>
                              {a.initials}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <div className={`flex items-center gap-1 ${task.overdue ? "text-red-500" : "text-muted-foreground"}`}>
                        {task.overdue ? (
                          <AlertTriangleIcon className="size-3" />
                        ) : (
                          <ClockIcon className="size-3" />
                        )}
                        <span className="font-mono text-[10px] tabular-nums">{task.due}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
