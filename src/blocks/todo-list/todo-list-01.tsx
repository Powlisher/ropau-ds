"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

const initialTasks = [
  { id: "1", text: "Review Q2 marketing budget allocation", done: true },
  { id: "2", text: "Send updated API docs to Meridian team", done: true },
  { id: "3", text: "Finalize speaker list for the Berlin meetup", done: false },
  { id: "4", text: "Audit third-party dependencies for CVEs", done: false },
  { id: "5", text: "Schedule 1:1 with Laura about onboarding flow", done: false },
  { id: "6", text: "Write changelog entry for v3.9 release", done: false },
  { id: "7", text: "Test webhook retry logic with Stripe sandbox", done: false },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 320, damping: 26 } },
}

export default function TodoList01() {
  const [tasks, setTasks] = React.useState(initialTasks)

  const toggle = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const doneCount = tasks.filter((t) => t.done).length

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
              <CardTitle className="font-heading text-lg tracking-tight">Tasks</CardTitle>
              <CardDescription>Daily checklist</CardDescription>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="size-4 text-emerald-500" />
              <span className="font-mono tabular-nums font-medium text-foreground">
                {doneCount}/{tasks.length}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-0.5">
            {tasks.map((task) => (
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
                <motion.span
                  className={`text-sm flex-1 ${task.done ? "text-muted-foreground line-through" : "text-foreground"}`}
                  animate={{ opacity: task.done ? 0.5 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {task.text}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
