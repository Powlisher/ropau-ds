"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { AlertTriangleIcon, ArrowUpIcon, MinusIcon } from "lucide-react"

type Task = {
  id: string
  title: string
  assignee: string
  effort: string
}

type Swimlane = {
  label: string
  icon: React.ReactNode
  color: string
  ringColor: string
  bgColor: string
}

const columns = ["Backlog", "In Progress", "Review", "Done"]
const columnColors = ["oklch(0.6 0.1 250)", "oklch(0.7 0.18 55)", "oklch(0.6 0.15 290)", "oklch(0.65 0.18 155)"]

const swimlanes: Swimlane[] = [
  { label: "Urgent", icon: <AlertTriangleIcon className="size-3.5" />, color: "text-red-600 dark:text-red-400", ringColor: "ring-red-200 dark:ring-red-900", bgColor: "bg-red-50/60 dark:bg-red-950/30" },
  { label: "High", icon: <ArrowUpIcon className="size-3.5" />, color: "text-amber-600 dark:text-amber-400", ringColor: "ring-amber-200 dark:ring-amber-900", bgColor: "bg-amber-50/40 dark:bg-amber-950/20" },
  { label: "Normal", icon: <MinusIcon className="size-3.5" />, color: "text-slate-500", ringColor: "ring-transparent", bgColor: "bg-transparent" },
]

const tasks: Record<string, Record<string, Task[]>> = {
  Urgent: {
    Backlog: [],
    "In Progress": [
      { id: "u1", title: "Fix payment double-charge on retry", assignee: "AV", effort: "3h" },
    ],
    Review: [
      { id: "u2", title: "Patch XSS vulnerability in comments", assignee: "JK", effort: "2h" },
    ],
    Done: [],
  },
  High: {
    Backlog: [
      { id: "h1", title: "Migrate auth to OAuth 2.1", assignee: "SC", effort: "8h" },
    ],
    "In Progress": [
      { id: "h2", title: "Implement rate limiting on API", assignee: "AV", effort: "5h" },
      { id: "h3", title: "Add two-factor authentication flow", assignee: "LM", effort: "6h" },
    ],
    Review: [],
    Done: [
      { id: "h4", title: "Upgrade database to v16", assignee: "JK", effort: "4h" },
    ],
  },
  Normal: {
    Backlog: [
      { id: "n1", title: "Add dark mode to settings page", assignee: "LM", effort: "3h" },
      { id: "n2", title: "Improve search relevance scoring", assignee: "SC", effort: "5h" },
    ],
    "In Progress": [
      { id: "n3", title: "Refactor notification preferences", assignee: "JK", effort: "4h" },
    ],
    Review: [
      { id: "n4", title: "Write API documentation for v3", assignee: "AV", effort: "6h" },
    ],
    Done: [
      { id: "n5", title: "Clean up unused CSS classes", assignee: "LM", effort: "2h" },
      { id: "n6", title: "Add loading skeletons to feed", assignee: "SC", effort: "3h" },
    ],
  },
}

const premiumShadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Kanban02() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-0">
      <div className="mb-1 grid grid-cols-[140px_repeat(4,1fr)] gap-3">
        <div />
        {columns.map((col, i) => (
          <div key={col} className="flex items-center gap-2 px-1 pb-3">
            <div className="size-2 rounded-full" style={{ backgroundColor: columnColors[i] }} />
            <span className="text-xs font-semibold tracking-tight text-foreground">{col}</span>
          </div>
        ))}
      </div>

      {swimlanes.map((lane) => (
        <motion.div
          key={lane.label}
          variants={rowVariants}
          className={`grid grid-cols-[140px_repeat(4,1fr)] gap-3 rounded-xl p-2 ring-1 ${lane.ringColor} ${lane.bgColor} mb-2`}
        >
          <div className={`flex items-start gap-1.5 px-2 pt-1 ${lane.color}`}>
            {lane.icon}
            <span className="text-xs font-semibold uppercase tracking-wider">{lane.label}</span>
          </div>
          {columns.map((col) => (
            <div key={col} className="min-h-[60px] space-y-2">
              {(tasks[lane.label]?.[col] ?? []).map((task) => (
                <motion.div key={task.id} whileHover={{ y: -1 }} transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}>
                  <Card className="border-border/40" style={{ boxShadow: premiumShadow }}>
                    <CardContent className="p-2.5">
                      <p className="mb-2 text-xs font-medium leading-snug text-foreground">{task.title}</p>
                      <div className="flex items-center justify-between">
                        <Avatar size="sm">
                          <AvatarFallback className="text-[9px]">{task.assignee}</AvatarFallback>
                        </Avatar>
                        <Badge variant="outline" className="text-[10px] font-mono tabular-nums">{task.effort}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      ))}
    </motion.div>
  )
}
