"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { PlusIcon, SendIcon } from "lucide-react"

type Task = { id: string; title: string; tag?: string }

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
    color: "oklch(0.6 0.14 250)",
    tasks: [
      { id: "q1", title: "Research competitor pricing models", tag: "Research" },
      { id: "q2", title: "Draft copy for feature announcement", tag: "Marketing" },
      { id: "q3", title: "Create database migration script", tag: "Backend" },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    color: "oklch(0.7 0.18 55)",
    tasks: [
      { id: "q4", title: "Build notification preferences panel", tag: "Frontend" },
      { id: "q5", title: "Optimize image resizing pipeline", tag: "Infra" },
    ],
  },
  {
    id: "review",
    title: "Review",
    color: "oklch(0.6 0.15 290)",
    tasks: [
      { id: "q6", title: "Code review: batch invoice generation", tag: "Backend" },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "oklch(0.65 0.18 155)",
    tasks: [
      { id: "q7", title: "Fix timezone rendering in calendar", tag: "Bug" },
      { id: "q8", title: "Add Stripe webhook signature verification", tag: "Security" },
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

export default function Kanban09() {
  const [columns, setColumns] = useState(initialColumns)
  const [activeInput, setActiveInput] = useState<string | null>(null)
  const [inputValues, setInputValues] = useState<Record<string, string>>({})

  const addTask = (colId: string) => {
    const value = inputValues[colId]?.trim()
    if (!value) return
    setColumns((prev) =>
      prev.map((col) =>
        col.id === colId
          ? { ...col, tasks: [...col.tasks, { id: `new-${Date.now()}`, title: value }] }
          : col
      )
    )
    setInputValues((prev) => ({ ...prev, [colId]: "" }))
    setActiveInput(null)
  }

  return (
    <motion.div className="flex gap-5 overflow-x-auto pb-4" variants={containerVariants} initial="hidden" animate="visible">
      {columns.map((col) => (
        <motion.div key={col.id} variants={colVariants} className="w-76 shrink-0">
          <div className="mb-3 flex items-center gap-2">
            <div className="size-2.5 rounded-full" style={{ backgroundColor: col.color }} />
            <h3 className="text-sm font-semibold tracking-tight text-foreground">{col.title}</h3>
            <span className="ml-auto font-mono text-xs tabular-nums text-muted-foreground">{col.tasks.length}</span>
          </div>

          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {col.tasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -1.5 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                >
                  <Card className="border-border/40" style={{ boxShadow: premiumShadow }}>
                    <CardContent className="p-3">
                      <p className="text-xs font-medium leading-snug text-foreground">{task.title}</p>
                      {task.tag && (
                        <Badge variant="secondary" className="mt-2 text-[10px]">{task.tag}</Badge>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {activeInput === col.id ? (
                <motion.div
                  key="input"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                >
                  <div className="flex gap-1.5">
                    <Input
                      autoFocus
                      placeholder="Task title..."
                      value={inputValues[col.id] ?? ""}
                      onChange={(e) => setInputValues((prev) => ({ ...prev, [col.id]: e.target.value }))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") addTask(col.id)
                        if (e.key === "Escape") setActiveInput(null)
                      }}
                      className="text-xs"
                    />
                    <motion.button
                      onClick={() => addTask(col.id)}
                      className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-foreground text-background"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                    >
                      <SendIcon className="size-3.5" />
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.button
                  key="button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActiveInput(col.id)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border/60 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                >
                  <PlusIcon className="size-3.5" />
                  Add task
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
