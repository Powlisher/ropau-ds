"use client"

import { useState } from "react"
import { ChevronUp, MessageSquare, Circle, Loader2, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

type Status = "open" | "in-progress" | "done"

interface FeedbackItem {
  id: number
  title: string
  votes: number
  comments: number
  status: Status
  voted: boolean
}

const statusConfig: Record<Status, { label: string; icon: typeof Circle; color: string; bg: string }> = {
  open: { label: "Open", icon: Circle, color: "text-muted-foreground", bg: "bg-muted/40" },
  "in-progress": { label: "In Progress", icon: Loader2, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/20" },
  done: { label: "Done", icon: CheckCircle2, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/20" },
}

const initialItems: FeedbackItem[] = [
  { id: 1, title: "Webhook support for real-time events", votes: 156, comments: 23, status: "in-progress", voted: true },
  { id: 2, title: "Two-factor authentication via TOTP", votes: 203, comments: 31, status: "done", voted: false },
  { id: 3, title: "Custom domain for public pages", votes: 89, comments: 12, status: "open", voted: false },
  { id: 4, title: "Granular role-based permissions", votes: 134, comments: 19, status: "in-progress", voted: true },
  { id: 5, title: "Bulk import from CSV/Excel", votes: 67, comments: 8, status: "open", voted: false },
  { id: 6, title: "Email digest settings per project", votes: 178, comments: 27, status: "done", voted: false },
]

const columns: Status[] = ["open", "in-progress", "done"]

export default function Feedback08() {
  const [items, setItems] = useState(initialItems)

  function toggleVote(id: number) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, voted: !item.voted, votes: item.voted ? item.votes - 1 : item.votes + 1 }
          : item
      )
    )
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-5">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Feedback board</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          <span className="font-mono tabular-nums">{items.length}</span> items across all stages
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {columns.map((status) => {
          const config = statusConfig[status]
          const StatusIcon = config.icon
          const columnItems = items.filter((i) => i.status === status)

          return (
            <div key={status}>
              <div className={`flex items-center gap-2 rounded-lg ${config.bg} px-3 py-2 mb-3`}>
                <StatusIcon className={`size-4 ${config.color} ${status === "in-progress" ? "animate-spin" : ""}`} />
                <span className={`text-sm font-semibold ${config.color}`}>{config.label}</span>
                <span className="ml-auto text-xs font-mono tabular-nums text-muted-foreground">{columnItems.length}</span>
              </div>

              <motion.div
                className="space-y-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {columnItems.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    whileHover={{ y: -1 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                    className="rounded-lg bg-card px-3 py-3 ring-1 ring-border/60"
                    style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
                  >
                    <p className="text-sm font-medium text-foreground leading-snug">{item.title}</p>
                    <div className="mt-2.5 flex items-center gap-3">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
                        onClick={() => toggleVote(item.id)}
                        className={`flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium transition-colors ${
                          item.voted
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <ChevronUp className="size-3.5" />
                        <span className="tabular-nums">{item.votes}</span>
                      </motion.button>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MessageSquare className="size-3" />
                        <span className="text-xs font-mono tabular-nums">{item.comments}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
