"use client"

import { useState } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDownIcon, ArrowRightIcon } from "lucide-react"
import { motion } from "framer-motion"

const data = [
  { id: 1, name: "Serverless Migration Plan", dept: "Engineering", priority: "Critical", date: "Apr 7, 2026", size: "14.2 MB" },
  { id: 2, name: "Brand Refresh Proposal", dept: "Design", priority: "High", date: "Apr 5, 2026", size: "8.7 MB" },
  { id: 3, name: "Q1 Revenue Report", dept: "Finance", priority: "Medium", date: "Apr 3, 2026", size: "2.1 MB" },
  { id: 4, name: "Employee Satisfaction Survey", dept: "People", priority: "Low", date: "Mar 30, 2026", size: "0.4 MB" },
  { id: 5, name: "Security Patch Notes v4.8", dept: "Engineering", priority: "Critical", date: "Apr 6, 2026", size: "1.8 MB" },
  { id: 6, name: "Content Calendar Q2", dept: "Marketing", priority: "Medium", date: "Apr 1, 2026", size: "3.2 MB" },
]

const sortFields = [
  { value: "date", label: "Date" },
  { value: "name", label: "Name" },
  { value: "dept", label: "Department" },
  { value: "priority", label: "Priority" },
  { value: "size", label: "File size" },
]

const priorityOrder: Record<string, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 }

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Sorting05() {
  const [primary, setPrimary] = useState("priority")
  const [secondary, setSecondary] = useState("date")

  function compareBy(key: string, a: typeof data[0], b: typeof data[0]): number {
    if (key === "name" || key === "dept") return a[key].localeCompare(b[key])
    if (key === "priority") return priorityOrder[a.priority] - priorityOrder[b.priority]
    if (key === "date") return new Date(b.date).getTime() - new Date(a.date).getTime()
    if (key === "size") return parseFloat(b.size) - parseFloat(a.size)
    return 0
  }

  const sorted = [...data].sort((a, b) => {
    const cmp = compareBy(primary, a, b)
    return cmp !== 0 ? cmp : compareBy(secondary, a, b)
  })

  return (
    <div className="mx-auto w-full max-w-2xl space-y-5">
      <div
        className="flex flex-wrap items-center gap-3 rounded-xl bg-card px-4 py-3 ring-1 ring-foreground/[0.06]"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
      >
        <ArrowUpDownIcon className="size-4 text-muted-foreground" />
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Sort by</span>

        <Select value={primary} onValueChange={(val) => setPrimary(val ?? "")}>
          <SelectTrigger size="sm" className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortFields.map((f) => (
              <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <ArrowRightIcon className="size-3.5 text-muted-foreground/40" />
        <span className="text-xs text-muted-foreground">then</span>

        <Select value={secondary} onValueChange={(val) => setSecondary(val ?? "")}>
          <SelectTrigger size="sm" className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortFields.filter((f) => f.value !== primary).map((f) => (
              <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <motion.div
        key={`${primary}-${secondary}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        {sorted.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ y: -1 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className="flex items-center gap-4 rounded-xl bg-card px-4 py-3 ring-1 ring-foreground/[0.06] transition-shadow hover:ring-foreground/10"
            style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
          >
            <div className="min-w-0 flex-1">
              <p className="truncate font-heading text-sm font-medium tracking-tight">{item.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{item.dept}</p>
            </div>
            <Badge variant={item.priority === "Critical" ? "destructive" : item.priority === "High" ? "default" : "secondary"}>
              {item.priority}
            </Badge>
            <span className="shrink-0 font-mono text-xs tabular-nums tracking-wide text-muted-foreground/60">{item.size}</span>
            <span className="shrink-0 font-mono text-xs tabular-nums tracking-wide text-muted-foreground">{item.date}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
