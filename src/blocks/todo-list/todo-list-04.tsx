"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { motion, Reorder } from "framer-motion"
import { GripVertical } from "lucide-react"

const initialTasks = [
  { id: "1", text: "Ship notification preferences UI", done: false },
  { id: "2", text: "Write migration script for legacy accounts", done: false },
  { id: "3", text: "Add Sentry breadcrumbs to payment flow", done: true },
  { id: "4", text: "Create test fixtures for multi-tenant scenarios", done: false },
  { id: "5", text: "Set up staging environment for partner demo", done: false },
  { id: "6", text: "Document new webhook event types", done: false },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

export default function TodoList04() {
  const [tasks, setTasks] = React.useState(initialTasks)

  const toggle = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
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
          <CardTitle className="font-heading text-lg tracking-tight">Sprint Backlog</CardTitle>
          <CardDescription>Drag to reorder by priority</CardDescription>
        </CardHeader>

        <CardContent>
          <Reorder.Group
            axis="y"
            values={tasks}
            onReorder={setTasks}
            className="space-y-1"
          >
            {tasks.map((task) => (
              <Reorder.Item
                key={task.id}
                value={task}
                className="list-none"
              >
                <motion.div
                  layout
                  className={`group flex items-center gap-2 rounded-lg border border-transparent px-2 py-2.5 transition-colors hover:bg-muted/50 ${
                    task.done ? "opacity-50" : ""
                  }`}
                  whileDrag={{
                    scale: 1.02,
                    boxShadow: "0 4px 8px rgba(20,20,15,0.08), 0 8px 16px rgba(20,20,15,0.08)",
                    cursor: "grabbing",
                  }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                >
                  <div className="cursor-grab text-muted-foreground/40 group-hover:text-muted-foreground/70 active:cursor-grabbing">
                    <GripVertical className="size-4" />
                  </div>

                  <Checkbox
                    checked={task.done}
                    onCheckedChange={() => toggle(task.id)}
                    className="size-[18px]"
                  />

                  <span className={`text-sm flex-1 ${task.done ? "text-muted-foreground line-through" : "text-foreground"}`}>
                    {task.text}
                  </span>

                  <span className="text-[10px] font-mono tabular-nums text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    #{task.id}
                  </span>
                </motion.div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </CardContent>
      </Card>
    </motion.div>
  )
}
