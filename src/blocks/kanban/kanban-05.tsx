"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { AlertCircleIcon } from "lucide-react"

type Task = {
  id: string
  title: string
  assignee: string
  points: number
}

type Column = {
  id: string
  title: string
  color: string
  wipLimit: number
  tasks: Task[]
}

const columns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    color: "oklch(0.6 0.14 250)",
    wipLimit: 8,
    tasks: [
      { id: "w1", title: "Design system color audit", assignee: "LM", points: 3 },
      { id: "w2", title: "Implement SSO with SAML", assignee: "AV", points: 8 },
      { id: "w3", title: "Add keyboard shortcuts to editor", assignee: "SC", points: 5 },
      { id: "w4", title: "Create onboarding email sequence", assignee: "TR", points: 2 },
      { id: "w5", title: "Set up error tracking (Sentry)", assignee: "JK", points: 3 },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    color: "oklch(0.7 0.18 55)",
    wipLimit: 3,
    tasks: [
      { id: "w6", title: "Build real-time collaboration engine", assignee: "AV", points: 13 },
      { id: "w7", title: "Redesign settings page layout", assignee: "LM", points: 5 },
      { id: "w8", title: "Optimize database query performance", assignee: "JK", points: 8 },
    ],
  },
  {
    id: "review",
    title: "Review",
    color: "oklch(0.6 0.15 290)",
    wipLimit: 2,
    tasks: [
      { id: "w9", title: "Refactor file upload service", assignee: "SC", points: 5 },
      { id: "w10", title: "Add unit tests for billing module", assignee: "TR", points: 3 },
      { id: "w11", title: "Update API versioning strategy", assignee: "AV", points: 5 },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "oklch(0.65 0.18 155)",
    wipLimit: 99,
    tasks: [
      { id: "w12", title: "Migrate to Tailwind v4", assignee: "LM", points: 5 },
      { id: "w13", title: "Fix race condition in queue worker", assignee: "JK", points: 8 },
    ],
  },
]

const premiumShadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const colVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Kanban05() {
  return (
    <motion.div className="flex gap-5 overflow-x-auto pb-4" variants={containerVariants} initial="hidden" animate="visible">
      {columns.map((column) => {
        const isOverLimit = column.tasks.length > column.wipLimit
        const fillPercent = Math.min((column.tasks.length / column.wipLimit) * 100, 100)

        return (
          <motion.div key={column.id} variants={colVariants} className="w-72 shrink-0">
            <div className="mb-2 flex items-center gap-2">
              <div className="size-2.5 rounded-full" style={{ backgroundColor: column.color }} />
              <h3 className="text-sm font-semibold tracking-tight text-foreground">{column.title}</h3>
              {isOverLimit && <AlertCircleIcon className="size-3.5 text-red-500" />}
              <span className="ml-auto font-mono text-xs tabular-nums text-muted-foreground">
                {column.tasks.length}{column.wipLimit < 99 && `/${column.wipLimit}`}
              </span>
            </div>

            {column.wipLimit < 99 && (
              <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: isOverLimit ? "oklch(0.65 0.25 25)" : column.color,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${fillPercent}%` }}
                  transition={{ type: "spring" as const, stiffness: 200, damping: 20 }}
                />
              </div>
            )}

            <div className="space-y-2">
              {column.tasks.map((task) => (
                <motion.div key={task.id} variants={cardVariants} whileHover={{ y: -1.5 }} transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}>
                  <Card
                    className={`border-border/40 ${isOverLimit ? "ring-1 ring-red-200 dark:ring-red-900/50" : ""}`}
                    style={{ boxShadow: premiumShadow }}
                  >
                    <CardContent className="p-3">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <p className="text-xs font-medium leading-snug text-foreground">{task.title}</p>
                        <span className="inline-flex size-5 shrink-0 items-center justify-center rounded bg-muted font-mono text-[10px] font-semibold tabular-nums text-muted-foreground">
                          {task.points}
                        </span>
                      </div>
                      <Avatar size="sm">
                        <AvatarFallback className="text-[9px]">{task.assignee}</AvatarFallback>
                      </Avatar>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
