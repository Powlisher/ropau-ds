"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

type Task = { id: string; title: string; urgent: boolean; important: boolean }

const tasks: Task[] = [
  { id: "1", title: "Fix production auth bug", urgent: true, important: true },
  { id: "2", title: "Prepare board presentation", urgent: true, important: true },
  { id: "3", title: "Review PR for caching layer", urgent: true, important: false },
  { id: "4", title: "Respond to partnership inquiry", urgent: true, important: false },
  { id: "5", title: "Define Q3 product roadmap", urgent: false, important: true },
  { id: "6", title: "Set up monitoring alerts", urgent: false, important: true },
  { id: "7", title: "Update team wiki pages", urgent: false, important: false },
  { id: "8", title: "Organize shared drive folders", urgent: false, important: false },
]

const quadrants = [
  { urgent: true, important: true, label: "Do First", sublabel: "Urgent and important", color: "bg-red-500/10 ring-red-500/20" },
  { urgent: true, important: false, label: "Delegate", sublabel: "Urgent, not important", color: "bg-amber-500/10 ring-amber-500/20" },
  { urgent: false, important: true, label: "Schedule", sublabel: "Important, not urgent", color: "bg-blue-500/10 ring-blue-500/20" },
  { urgent: false, important: false, label: "Eliminate", sublabel: "Neither urgent nor important", color: "bg-muted ring-foreground/[0.04]" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Sorting07() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-heading text-lg font-semibold tracking-tight">Priority Matrix</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">Eisenhower matrix for task prioritization</p>
        </div>
        <Badge variant="secondary">
          <span className="font-mono tabular-nums">{tasks.length}</span> tasks
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {quadrants.map((q) => {
          const quadTasks = tasks.filter((t) => t.urgent === q.urgent && t.important === q.important)
          return (
            <div
              key={q.label}
              className={`rounded-xl p-4 ring-1 ${q.color}`}
              style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
            >
              <div className="mb-3">
                <h4 className="font-heading text-sm font-semibold tracking-tight">{q.label}</h4>
                <p className="text-[11px] text-muted-foreground">{q.sublabel}</p>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-1.5"
              >
                {quadTasks.map((task) => (
                  <motion.button
                    key={task.id}
                    variants={itemVariants}
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                    onClick={() => setSelected(selected === task.id ? null : task.id)}
                    className={`w-full rounded-lg bg-card px-3 py-2 text-left text-sm ring-1 transition-all ${
                      selected === task.id
                        ? "ring-primary/30 font-medium"
                        : "ring-foreground/[0.04] hover:ring-foreground/10"
                    }`}
                  >
                    {task.title}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="text-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40">
          Urgent
        </div>
        <div className="text-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40">
          Not urgent
        </div>
      </div>
    </div>
  )
}
