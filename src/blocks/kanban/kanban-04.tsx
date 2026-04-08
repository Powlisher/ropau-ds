"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { ImageIcon, CalendarIcon } from "lucide-react"

type Task = {
  id: string
  title: string
  assignee: string
  date: string
  thumbnail: { gradient: string; label: string }
  tags: string[]
}

const columns = [
  {
    id: "brief",
    title: "Brief",
    color: "oklch(0.6 0.14 250)",
    tasks: [
      {
        id: "c1",
        title: "Homepage hero section redesign",
        assignee: "EM",
        date: "Apr 12",
        thumbnail: { gradient: "linear-gradient(135deg, oklch(0.85 0.08 220), oklch(0.75 0.12 260))", label: "Hero" },
        tags: ["Landing"],
      },
      {
        id: "c2",
        title: "Product comparison table layout",
        assignee: "TR",
        date: "Apr 15",
        thumbnail: { gradient: "linear-gradient(135deg, oklch(0.88 0.06 80), oklch(0.78 0.1 55))", label: "Table" },
        tags: ["Pricing"],
      },
    ],
  },
  {
    id: "design",
    title: "Design",
    color: "oklch(0.65 0.18 330)",
    tasks: [
      {
        id: "c3",
        title: "Mobile checkout flow wireframes",
        assignee: "LM",
        date: "Apr 10",
        thumbnail: { gradient: "linear-gradient(135deg, oklch(0.82 0.1 330), oklch(0.72 0.14 300))", label: "Checkout" },
        tags: ["Mobile", "E-commerce"],
      },
    ],
  },
  {
    id: "build",
    title: "Build",
    color: "oklch(0.7 0.18 55)",
    tasks: [
      {
        id: "c4",
        title: "Interactive pricing calculator",
        assignee: "AV",
        date: "Apr 8",
        thumbnail: { gradient: "linear-gradient(135deg, oklch(0.85 0.08 155), oklch(0.72 0.14 155))", label: "Calc" },
        tags: ["Frontend", "Billing"],
      },
      {
        id: "c5",
        title: "Customer testimonials carousel",
        assignee: "SC",
        date: "Apr 9",
        thumbnail: { gradient: "linear-gradient(135deg, oklch(0.9 0.04 55), oklch(0.8 0.08 35))", label: "Social" },
        tags: ["Marketing"],
      },
      {
        id: "c6",
        title: "Dashboard notification center",
        assignee: "EM",
        date: "Apr 11",
        thumbnail: { gradient: "linear-gradient(135deg, oklch(0.78 0.12 270), oklch(0.68 0.16 290))", label: "Notifs" },
        tags: ["App"],
      },
    ],
  },
  {
    id: "shipped",
    title: "Shipped",
    color: "oklch(0.65 0.18 155)",
    tasks: [
      {
        id: "c7",
        title: "Blog post template with rich media",
        assignee: "TR",
        date: "Apr 5",
        thumbnail: { gradient: "linear-gradient(135deg, oklch(0.88 0.05 180), oklch(0.76 0.1 200))", label: "Blog" },
        tags: ["Content"],
      },
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
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24, staggerChildren: 0.05 } },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Kanban04() {
  return (
    <motion.div className="flex gap-5 overflow-x-auto pb-4" variants={containerVariants} initial="hidden" animate="visible">
      {columns.map((column) => (
        <motion.div key={column.id} variants={colVariants} className="w-80 shrink-0">
          <div className="mb-3 flex items-center gap-2">
            <div className="size-2.5 rounded-full" style={{ backgroundColor: column.color }} />
            <h3 className="text-sm font-semibold tracking-tight text-foreground">{column.title}</h3>
            <span className="ml-auto font-mono text-xs tabular-nums text-muted-foreground">{column.tasks.length}</span>
          </div>
          <div className="space-y-3">
            {column.tasks.map((task) => (
              <motion.div key={task.id} variants={cardVariants} whileHover={{ y: -2 }} transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}>
                <Card className="overflow-hidden border-border/40" style={{ boxShadow: premiumShadow }}>
                  <div
                    className="flex h-28 items-center justify-center"
                    style={{ background: task.thumbnail.gradient }}
                  >
                    <div className="flex items-center gap-1.5 rounded-lg bg-white/70 px-3 py-1.5 backdrop-blur-sm dark:bg-black/30">
                      <ImageIcon className="size-3.5 text-foreground/70" />
                      <span className="text-xs font-medium text-foreground/80">{task.thumbnail.label}</span>
                    </div>
                  </div>
                  <CardContent className="p-3.5">
                    <p className="mb-2 text-sm font-medium leading-snug text-foreground">{task.title}</p>
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <Avatar size="sm">
                        <AvatarFallback className="text-[10px]">{task.assignee}</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <CalendarIcon className="size-3" />
                        <span className="font-mono text-[10px] tabular-nums">{task.date}</span>
                      </div>
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
