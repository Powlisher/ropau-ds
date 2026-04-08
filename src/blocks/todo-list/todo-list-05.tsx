"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

interface Subtask {
  id: string
  text: string
  done: boolean
}

interface Task {
  id: string
  text: string
  subtasks: Subtask[]
}

const initialTasks: Task[] = [
  {
    id: "1",
    text: "Authentication system overhaul",
    subtasks: [
      { id: "1a", text: "Implement OAuth2 PKCE flow", done: true },
      { id: "1b", text: "Add MFA with TOTP support", done: true },
      { id: "1c", text: "Session rotation on privilege escalation", done: false },
      { id: "1d", text: "Write integration tests for all auth paths", done: false },
    ],
  },
  {
    id: "2",
    text: "Billing infrastructure migration",
    subtasks: [
      { id: "2a", text: "Map Stripe products to new pricing tiers", done: true },
      { id: "2b", text: "Build proration logic for mid-cycle upgrades", done: true },
      { id: "2c", text: "Handle multi-currency invoicing", done: true },
    ],
  },
  {
    id: "3",
    text: "Performance monitoring setup",
    subtasks: [
      { id: "3a", text: "Configure OpenTelemetry SDK", done: true },
      { id: "3b", text: "Set up Grafana dashboards for P95/P99", done: false },
      { id: "3c", text: "Add custom spans for checkout critical path", done: false },
      { id: "3d", text: "Create alerting rules for latency spikes", done: false },
      { id: "3e", text: "Document runbook for common alerts", done: false },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

function TaskGroup({ task, onToggle }: { task: Task; onToggle: (taskId: string, subtaskId: string) => void }) {
  const [expanded, setExpanded] = React.useState(true)
  const doneCount = task.subtasks.filter((s) => s.done).length
  const progress = (doneCount / task.subtasks.length) * 100
  const allDone = doneCount === task.subtasks.length

  return (
    <motion.div variants={itemVariants} className="rounded-xl bg-muted/30 p-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-2 text-left"
      >
        <motion.div
          animate={{ rotate: expanded ? 90 : 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
        >
          <ChevronRight className="size-4 text-muted-foreground" />
        </motion.div>

        <span className={`text-sm font-medium flex-1 ${allDone ? "text-muted-foreground line-through" : "text-foreground"}`}>
          {task.text}
        </span>

        <span className="text-[11px] font-mono tabular-nums text-muted-foreground">
          {doneCount}/{task.subtasks.length}
        </span>
      </button>

      <div className="mt-2 ml-6">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className={`h-full rounded-full ${allDone ? "bg-emerald-500" : "bg-foreground"}`}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring" as const, stiffness: 100, damping: 20 }}
          />
        </div>
      </div>

      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="mt-2 ml-6 space-y-0.5 overflow-hidden"
        >
          {task.subtasks.map((sub) => (
            <div
              key={sub.id}
              className="flex items-center gap-2.5 rounded-md px-1 py-1.5 hover:bg-muted/60 transition-colors"
            >
              <Checkbox
                checked={sub.done}
                onCheckedChange={() => onToggle(task.id, sub.id)}
                className="size-4"
              />
              <span className={`text-[13px] ${sub.done ? "text-muted-foreground line-through opacity-60" : "text-foreground"}`}>
                {sub.text}
              </span>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

export default function TodoList05() {
  const [tasks, setTasks] = React.useState(initialTasks)

  const handleToggle = (taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, subtasks: t.subtasks.map((s) => (s.id === subtaskId ? { ...s, done: !s.done } : s)) }
          : t
      )
    )
  }

  const totalSubs = tasks.reduce((acc, t) => acc + t.subtasks.length, 0)
  const doneSubs = tasks.reduce((acc, t) => acc + t.subtasks.filter((s) => s.done).length, 0)

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
              <CardTitle className="font-heading text-lg tracking-tight">Epic Tracker</CardTitle>
              <CardDescription>Tasks with subtasks</CardDescription>
            </div>
            <span className="text-sm font-mono tabular-nums font-medium text-foreground">
              {doneSubs}/{totalSubs}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {tasks.map((task) => (
            <TaskGroup key={task.id} task={task} onToggle={handleToggle} />
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}
