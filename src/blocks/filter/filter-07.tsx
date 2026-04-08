"use client"

import { useState } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { LayoutGridIcon, ListIcon, ArrowUpDownIcon } from "lucide-react"
import { motion } from "framer-motion"

const mockItems = [
  { id: 1, name: "Design System Audit", status: "In Progress", updated: "2h ago", priority: "High" },
  { id: 2, name: "API Documentation", status: "Complete", updated: "1d ago", priority: "Medium" },
  { id: 3, name: "User Research Synthesis", status: "In Progress", updated: "4h ago", priority: "Critical" },
  { id: 4, name: "Performance Benchmarks", status: "Not Started", updated: "3d ago", priority: "Low" },
  { id: 5, name: "Security Review Q2", status: "In Progress", updated: "6h ago", priority: "High" },
  { id: 6, name: "Localization Sprint", status: "Complete", updated: "2d ago", priority: "Medium" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Filter07() {
  const [view, setView] = useState("grid")
  const [sortBy, setSortBy] = useState("updated")

  return (
    <div className="mx-auto w-full max-w-3xl space-y-5">
      <div
        className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-card px-4 py-3 ring-1 ring-foreground/[0.06]"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
      >
        <div className="flex items-center gap-3">
          <ToggleGroup value={[view]} onValueChange={(val) => { if (val.length > 0) setView(val[val.length - 1]) }}>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <LayoutGridIcon className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <ListIcon className="size-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <div className="h-5 w-px bg-border" />

          <p className="text-sm text-muted-foreground">
            <span className="font-mono tabular-nums font-medium text-foreground">{mockItems.length}</span> items
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDownIcon className="size-3.5 text-muted-foreground" />
          <Select value={sortBy} onValueChange={(val) => setSortBy(val ?? "")}>
            <SelectTrigger size="sm" className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="updated">Last updated</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <motion.div
        key={view}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={view === "grid" ? "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" : "space-y-2"}
      >
        {mockItems.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ y: -1 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className={`cursor-pointer rounded-xl bg-card ring-1 ring-foreground/[0.06] transition-shadow hover:ring-foreground/10 ${
              view === "grid" ? "p-4" : "flex items-center gap-4 px-4 py-3"
            }`}
            style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
          >
            {view === "grid" ? (
              <>
                <p className="font-heading text-sm font-semibold tracking-tight">{item.name}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                    item.status === "Complete" ? "bg-emerald-500/10 text-emerald-600" :
                    item.status === "In Progress" ? "bg-amber-500/10 text-amber-600" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {item.status}
                  </span>
                  <span className="font-mono text-[11px] tabular-nums tracking-wide text-muted-foreground/60">{item.updated}</span>
                </div>
              </>
            ) : (
              <>
                <p className="min-w-0 flex-1 truncate font-heading text-sm font-medium tracking-tight">{item.name}</p>
                <span className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${
                  item.status === "Complete" ? "bg-emerald-500/10 text-emerald-600" :
                  item.status === "In Progress" ? "bg-amber-500/10 text-amber-600" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {item.status}
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">{item.priority}</span>
                <span className="shrink-0 font-mono text-xs tabular-nums tracking-wide text-muted-foreground/60">{item.updated}</span>
              </>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
