"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Sun, CalendarDays, Clock } from "lucide-react"

type Column = "today" | "this-week" | "later"

const columnConfig: Record<Column, { label: string; icon: typeof Sun; description: string }> = {
  today: { label: "Today", icon: Sun, description: "Focus on these" },
  "this-week": { label: "This Week", icon: CalendarDays, description: "Complete by Friday" },
  later: { label: "Later", icon: Clock, description: "Backlog" },
}

interface Task {
  id: string
  text: string
  done: boolean
  column: Column
}

const initialTasks: Task[] = [
  { id: "1", text: "Deploy auth hotfix to production", column: "today", done: false },
  { id: "2", text: "Reply to Helios support escalation", column: "today", done: false },
  { id: "3", text: "Review PR #312 from Thomas", column: "today", done: true },
  { id: "4", text: "Write test coverage for billing module", column: "this-week", done: false },
  { id: "5", text: "Prepare slides for Friday all-hands", column: "this-week", done: false },
  { id: "6", text: "Update staging environment secrets", column: "this-week", done: true },
  { id: "7", text: "Evaluate new APM tools", column: "this-week", done: false },
  { id: "8", text: "Refactor notification service to event-driven", column: "later", done: false },
  { id: "9", text: "Research edge runtime for API routes", column: "later", done: false },
  { id: "10", text: "Plan team offsite for Q3", column: "later", done: false },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function ColumnCard({ column, tasks, onToggle }: { column: Column; tasks: Task[]; onToggle: (id: string) => void }) {
  const config = columnConfig[column]
  const Icon = config.icon
  const doneCount = tasks.filter((t) => t.done).length

  return (
    <motion.div variants={itemVariants} className="flex-1 min-w-[240px]">
      <Card
        className="h-full"
        style={{
          boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon className="size-4 text-muted-foreground" />
              <CardTitle className="font-heading text-sm tracking-tight">{config.label}</CardTitle>
            </div>
            <Badge variant="secondary" className="font-mono text-[10px] tabular-nums">
              {doneCount}/{tasks.length}
            </Badge>
          </div>
          <p className="text-[11px] text-muted-foreground">{config.description}</p>
        </CardHeader>

        <CardContent>
          <div className="space-y-0.5">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                className="group flex items-center gap-2.5 rounded-md px-1.5 py-2 transition-colors hover:bg-muted/50"
              >
                <Checkbox
                  checked={task.done}
                  onCheckedChange={() => onToggle(task.id)}
                  className="size-4"
                />
                <span className={`text-[13px] flex-1 leading-snug ${task.done ? "text-muted-foreground line-through opacity-50" : "text-foreground"}`}>
                  {task.text}
                </span>
              </motion.div>
            ))}

            {tasks.length === 0 && (
              <div className="py-6 text-center">
                <p className="text-sm text-muted-foreground/60">Nothing here yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function TodoList10() {
  const [tasks, setTasks] = React.useState(initialTasks)

  const toggle = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  return (
    <motion.div
      className="py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-6">
        <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">Plan Your Week</h2>
        <p className="mt-1 text-sm text-muted-foreground">Organize tasks by urgency</p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {(["today", "this-week", "later"] as Column[]).map((col) => (
          <ColumnCard
            key={col}
            column={col}
            tasks={tasks.filter((t) => t.column === col)}
            onToggle={toggle}
          />
        ))}
      </div>
    </motion.div>
  )
}
