"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

type Tag = "frontend" | "backend" | "design" | "infra" | "docs" | "testing"

const tagStyles: Record<Tag, string> = {
  frontend: "bg-sky-50 text-sky-700 border-sky-200",
  backend: "bg-violet-50 text-violet-700 border-violet-200",
  design: "bg-rose-50 text-rose-700 border-rose-200",
  infra: "bg-amber-50 text-amber-700 border-amber-200",
  docs: "bg-emerald-50 text-emerald-700 border-emerald-200",
  testing: "bg-indigo-50 text-indigo-700 border-indigo-200",
}

const initialTasks = [
  { id: "1", text: "Implement dark mode token system", tags: ["frontend", "design"] as Tag[], done: false },
  { id: "2", text: "Add Redis caching for user sessions", tags: ["backend", "infra"] as Tag[], done: true },
  { id: "3", text: "Create component showcase page", tags: ["frontend", "docs"] as Tag[], done: false },
  { id: "4", text: "Write E2E tests for checkout flow", tags: ["testing", "frontend"] as Tag[], done: false },
  { id: "5", text: "Set up Terraform for staging env", tags: ["infra"] as Tag[], done: false },
  { id: "6", text: "Redesign empty state illustrations", tags: ["design"] as Tag[], done: true },
  { id: "7", text: "Document REST API error codes", tags: ["docs", "backend"] as Tag[], done: false },
  { id: "8", text: "Add connection pooling to Postgres", tags: ["backend", "infra"] as Tag[], done: false },
]

const allTags = Object.keys(tagStyles) as Tag[]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 320, damping: 26 } },
}

export default function TodoList06() {
  const [tasks, setTasks] = React.useState(initialTasks)
  const [activeTag, setActiveTag] = React.useState<Tag | null>(null)

  const toggle = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const filtered = activeTag ? tasks.filter((t) => t.tags.includes(activeTag)) : tasks

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
          <CardTitle className="font-heading text-lg tracking-tight">Categorized Tasks</CardTitle>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTag(null)}
              className={`rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${
                activeTag === null
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              All ({tasks.length})
            </motion.button>
            {allTags.map((tag) => {
              const count = tasks.filter((t) => t.tags.includes(tag)).length
              if (count === 0) return null
              return (
                <motion.button
                  key={tag}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`rounded-md px-2 py-1 text-[11px] font-medium capitalize transition-colors ${
                    activeTag === tag
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tag} ({count})
                </motion.button>
              )
            })}
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-0.5">
            {filtered.map((task) => (
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

                <div className="flex-1 min-w-0">
                  <span className={`text-sm ${task.done ? "text-muted-foreground line-through opacity-50" : "text-foreground"}`}>
                    {task.text}
                  </span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {task.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-block rounded px-1.5 py-0 text-[10px] font-medium capitalize border ${tagStyles[tag]}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
