"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"

type KanbanCard = {
  title: string
  description: string
  assignee: string
  priority: "high" | "medium" | "low"
  labels: string[]
}

const columns: { title: string; count: number; cards: KanbanCard[] }[] = [
  {
    title: "To Do",
    count: 5,
    cards: [
      { title: "Redesign onboarding flow", description: "Simplify the 5-step wizard into 3 steps", assignee: "SD", priority: "high", labels: ["Design", "UX"] },
      { title: "Add CSV export to reports", description: "Allow users to download filtered data", assignee: "MC", priority: "medium", labels: ["Feature"] },
      { title: "Update privacy policy page", description: "New GDPR compliance requirements", assignee: "EM", priority: "low", labels: ["Legal"] },
    ],
  },
  {
    title: "In Progress",
    count: 3,
    cards: [
      { title: "API rate limiting", description: "Implement sliding window algorithm for v2 endpoints", assignee: "TR", priority: "high", labels: ["Backend", "Security"] },
      { title: "Dark mode color tokens", description: "Audit and fix contrast ratios in dark theme", assignee: "AP", priority: "medium", labels: ["Design"] },
    ],
  },
  {
    title: "Done",
    count: 8,
    cards: [
      { title: "Migrate auth to Clerk", description: "All users transitioned successfully", assignee: "TR", priority: "medium", labels: ["Infra"] },
      { title: "Fix checkout race condition", description: "Resolved duplicate charge issue", assignee: "MC", priority: "high", labels: ["Bug", "Critical"] },
      { title: "Add Intercom widget", description: "Support chat now live on all pages", assignee: "JE", priority: "low", labels: ["Support"] },
    ],
  },
]

const priorityRing: Record<string, string> = {
  high: "ring-2 ring-primary/20",
  medium: "ring-1 ring-border",
  low: "ring-1 ring-border/60",
}

const shadow = "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const columnVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24, staggerChildren: 0.05 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function DashboardKanban() {
  return (
    <motion.div
      className="grid grid-cols-1 gap-6 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {columns.map((column) => (
        <motion.div key={column.title} variants={columnVariants}>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold">{column.title}</h3>
              <span className="flex size-5 items-center justify-center rounded-full bg-muted text-[11px] font-medium tabular-nums text-muted-foreground">
                {column.count}
              </span>
            </div>
          </div>
          <div className="space-y-3">
            {column.cards.map((card) => (
              <motion.div
                key={card.title}
                variants={cardVariants}
                whileHover={{ y: -2 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              >
                <Card className={`cursor-grab ${priorityRing[card.priority]}`} style={{ boxShadow: shadow }}>
                  <CardContent className="space-y-2.5 pt-1">
                    <div className="text-sm font-medium leading-snug">{card.title}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{card.description}</div>
                    <div className="flex items-center justify-between pt-0.5">
                      <div className="flex flex-wrap gap-1">
                        {card.labels.map((label) => (
                          <Badge key={label} variant="secondary" className="text-[10px] px-1.5 py-0">{label}</Badge>
                        ))}
                      </div>
                      <Avatar size="sm">
                        <AvatarFallback>{card.assignee}</AvatarFallback>
                      </Avatar>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
