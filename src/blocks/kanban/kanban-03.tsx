"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react"

type Column = {
  id: string
  title: string
  color: string
  count: number
  tasks: { id: string; title: string; tag: string }[]
}

const initialColumns: Column[] = [
  {
    id: "backlog",
    title: "Backlog",
    color: "oklch(0.6 0.1 250)",
    count: 14,
    tasks: [
      { id: "b1", title: "Evaluate headless CMS options", tag: "Research" },
      { id: "b2", title: "Design token system for components", tag: "Design" },
      { id: "b3", title: "Benchmark API response times", tag: "Perf" },
    ],
  },
  {
    id: "todo",
    title: "To Do",
    color: "oklch(0.65 0.15 280)",
    count: 7,
    tasks: [
      { id: "t1", title: "Set up monitoring dashboards", tag: "DevOps" },
      { id: "t2", title: "Create user feedback survey", tag: "Product" },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    color: "oklch(0.7 0.18 55)",
    count: 4,
    tasks: [
      { id: "p1", title: "Refactor image optimization pipeline", tag: "Backend" },
      { id: "p2", title: "Build multi-tenant permission model", tag: "Backend" },
      { id: "p3", title: "Accessibility audit on checkout", tag: "Frontend" },
      { id: "p4", title: "Implement webhook retry mechanism", tag: "Backend" },
    ],
  },
  {
    id: "review",
    title: "In Review",
    color: "oklch(0.6 0.14 290)",
    count: 3,
    tasks: [
      { id: "r1", title: "PR #412: Add batch export endpoint", tag: "Backend" },
      { id: "r2", title: "PR #408: Mobile navigation redesign", tag: "Frontend" },
      { id: "r3", title: "PR #415: Update GDPR consent flow", tag: "Legal" },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "oklch(0.65 0.18 155)",
    count: 23,
    tasks: [
      { id: "d1", title: "Migrate to Next.js 16", tag: "Infra" },
      { id: "d2", title: "Launch email verification flow", tag: "Auth" },
    ],
  },
]

const premiumShadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Kanban03() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    backlog: false,
    todo: true,
    progress: true,
    review: true,
    done: false,
  })

  const toggle = (id: string) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <motion.div
      className="flex gap-4 overflow-x-auto pb-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {initialColumns.map((column) => {
        const isOpen = expanded[column.id]
        return (
          <motion.div
            key={column.id}
            variants={itemVariants}
            className={`shrink-0 transition-all duration-200 ${isOpen ? "w-72" : "w-48"}`}
          >
            <button
              onClick={() => toggle(column.id)}
              className="mb-3 flex w-full items-center gap-2 text-left"
            >
              <div className="size-2.5 rounded-full" style={{ backgroundColor: column.color }} />
              <span className="text-sm font-semibold tracking-tight text-foreground">{column.title}</span>
              <span className="ml-1 inline-flex size-5 items-center justify-center rounded-md bg-muted font-mono text-[10px] font-semibold tabular-nums text-muted-foreground">
                {column.count}
              </span>
              <span className="ml-auto text-muted-foreground">
                {isOpen ? <ChevronDownIcon className="size-3.5" /> : <ChevronRightIcon className="size-3.5" />}
              </span>
            </button>

            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 28 }}
                  className="space-y-2 overflow-hidden"
                >
                  {column.tasks.map((task) => (
                    <motion.div key={task.id} whileHover={{ y: -1 }} transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}>
                      <Card className="border-border/40" style={{ boxShadow: premiumShadow }}>
                        <CardContent className="p-3">
                          <p className="mb-1.5 text-xs font-medium leading-snug text-foreground">{task.title}</p>
                          <span className="inline-block rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">{task.tag}</span>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                  {column.count > column.tasks.length && (
                    <p className="py-1.5 text-center font-mono text-[10px] tabular-nums text-muted-foreground">
                      +{column.count - column.tasks.length} more
                    </p>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="collapsed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-lg border border-dashed border-border/50 p-4"
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-heading text-2xl font-bold tabular-nums tracking-tight text-foreground">{column.count}</span>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">tasks</span>
                  </div>
                  <div className="mt-3 flex justify-center gap-1">
                    {column.tasks.slice(0, 4).map((_, i) => (
                      <div key={i} className="h-1 w-4 rounded-full" style={{ backgroundColor: column.color, opacity: 0.4 + i * 0.15 }} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
