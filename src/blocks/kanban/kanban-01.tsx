"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { GripVerticalIcon, PlusIcon } from "lucide-react"

type Task = {
  id: string
  title: string
  assignee: { initials: string; name: string }
  priority: "low" | "medium" | "high"
  tags: string[]
}

type Column = {
  id: string
  title: string
  color: string
  tasks: Task[]
}

const initialColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    color: "oklch(0.65 0.15 250)",
    tasks: [
      { id: "t1", title: "Redesign onboarding flow for mobile", assignee: { initials: "LM", name: "Lena Moretti" }, priority: "high", tags: ["Design"] },
      { id: "t2", title: "Write integration tests for auth module", assignee: { initials: "JK", name: "Jonas Krause" }, priority: "medium", tags: ["Backend"] },
      { id: "t3", title: "Update privacy policy page", assignee: { initials: "SC", name: "Sara Chen" }, priority: "low", tags: ["Legal"] },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    color: "oklch(0.7 0.18 55)",
    tasks: [
      { id: "t4", title: "Implement Stripe webhook handler", assignee: { initials: "AV", name: "Alex Voronov" }, priority: "high", tags: ["Backend", "Billing"] },
      { id: "t5", title: "Build dashboard analytics charts", assignee: { initials: "LM", name: "Lena Moretti" }, priority: "medium", tags: ["Frontend"] },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "oklch(0.65 0.18 155)",
    tasks: [
      { id: "t6", title: "Configure CI/CD pipeline for staging", assignee: { initials: "JK", name: "Jonas Krause" }, priority: "medium", tags: ["DevOps"] },
      { id: "t7", title: "Fix timezone bug in scheduler", assignee: { initials: "AV", name: "Alex Voronov" }, priority: "high", tags: ["Backend"] },
      { id: "t8", title: "Add CSV export to reports page", assignee: { initials: "SC", name: "Sara Chen" }, priority: "low", tags: ["Frontend"] },
      { id: "t9", title: "Migrate user avatars to CDN", assignee: { initials: "LM", name: "Lena Moretti" }, priority: "low", tags: ["Infra"] },
    ],
  },
]

const priorityStyles = {
  high: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  low: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const columnVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const premiumShadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

export default function Kanban01() {
  const [columns] = useState(initialColumns)

  return (
    <motion.div
      className="flex gap-5 overflow-x-auto pb-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {columns.map((column) => (
        <motion.div key={column.id} variants={columnVariants} className="w-80 shrink-0">
          <div className="mb-3 flex items-center gap-2.5">
            <div className="size-2.5 rounded-full" style={{ backgroundColor: column.color }} />
            <h3 className="font-heading text-sm font-semibold tracking-tight text-foreground">{column.title}</h3>
            <span className="ml-auto font-mono text-xs tabular-nums text-muted-foreground">{column.tasks.length}</span>
          </div>
          <div className="space-y-2.5">
            {column.tasks.map((task) => (
              <motion.div key={task.id} variants={cardVariants} whileHover={{ y: -2 }} transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}>
                <Card className="cursor-grab border-border/50" style={{ boxShadow: premiumShadow }}>
                  <CardContent className="p-3.5">
                    <div className="mb-2.5 flex items-start justify-between gap-2">
                      <p className="text-sm font-medium leading-snug text-foreground">{task.title}</p>
                      <GripVerticalIcon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground/50" />
                    </div>
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px] font-medium">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <Avatar size="sm">
                        <AvatarFallback className="text-[10px]">{task.assignee.initials}</AvatarFallback>
                      </Avatar>
                      <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${priorityStyles[task.priority]}`}>
                        {task.priority}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            <motion.button
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border/60 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-border hover:text-foreground"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            >
              <PlusIcon className="size-3.5" />
              Add task
            </motion.button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
