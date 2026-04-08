"use client"

import { useState } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { LayoutGridIcon, ListIcon, ColumnsIcon } from "lucide-react"
import { motion } from "framer-motion"

const items = [
  { id: 1, title: "Authentication Flow", category: "Backend", progress: 87, color: "bg-emerald-500" },
  { id: 2, title: "Dashboard Redesign", category: "Frontend", progress: 42, color: "bg-blue-500" },
  { id: 3, title: "Email Notification Service", category: "Backend", progress: 100, color: "bg-emerald-500" },
  { id: 4, title: "Mobile Responsive Layout", category: "Frontend", progress: 63, color: "bg-blue-500" },
  { id: 5, title: "Payment Integration", category: "Backend", progress: 28, color: "bg-amber-500" },
  { id: 6, title: "Search Index Rebuild", category: "DevOps", progress: 95, color: "bg-violet-500" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Sorting06() {
  const [layout, setLayout] = useState("grid")
  const [sortBy, setSortBy] = useState("progress")

  const sorted = [...items].sort((a, b) => {
    if (sortBy === "progress") return b.progress - a.progress
    if (sortBy === "title") return a.title.localeCompare(b.title)
    return a.category.localeCompare(b.category)
  })

  return (
    <div className="mx-auto w-full max-w-3xl space-y-5">
      <div className="flex items-center justify-between">
        <ToggleGroup value={[layout]} onValueChange={(val) => { if (val.length > 0) setLayout(val[val.length - 1]) }}>
          <ToggleGroupItem value="grid" aria-label="Grid"><LayoutGridIcon className="size-4" /></ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List"><ListIcon className="size-4" /></ToggleGroupItem>
          <ToggleGroupItem value="compact" aria-label="Compact"><ColumnsIcon className="size-4" /></ToggleGroupItem>
        </ToggleGroup>

        <Select value={sortBy} onValueChange={(val) => setSortBy(val ?? "")}>
          <SelectTrigger size="sm" className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="progress">Progress</SelectItem>
            <SelectItem value="title">Title A-Z</SelectItem>
            <SelectItem value="category">Category</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <motion.div
        key={`${layout}-${sortBy}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={
          layout === "grid" ? "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" :
          layout === "compact" ? "grid grid-cols-2 gap-2 sm:grid-cols-3" :
          "space-y-2"
        }
      >
        {sorted.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ y: -2 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className={`cursor-pointer rounded-xl bg-card ring-1 ring-foreground/[0.06] transition-shadow hover:ring-foreground/10 ${
              layout === "compact" ? "p-3" : layout === "list" ? "flex items-center gap-4 px-4 py-3" : "p-4"
            }`}
            style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
          >
            {layout === "list" ? (
              <>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-heading text-sm font-medium tracking-tight">{item.title}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{item.category}</span>
                <div className="flex w-24 shrink-0 items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.progress}%` }} />
                  </div>
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">{item.progress}%</span>
                </div>
              </>
            ) : (
              <>
                <p className={`font-heading font-medium tracking-tight ${layout === "compact" ? "text-xs" : "text-sm"}`}>{item.title}</p>
                <p className={`text-muted-foreground ${layout === "compact" ? "mt-0.5 text-[11px]" : "mt-1 text-xs"}`}>{item.category}</p>
                <div className={`flex items-center gap-2 ${layout === "compact" ? "mt-2" : "mt-3"}`}>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className={`h-full rounded-full ${item.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{ type: "spring" as const, stiffness: 100, damping: 20 }}
                    />
                  </div>
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">{item.progress}%</span>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
