"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { SlidersHorizontalIcon, XIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Filter = { id: string; label: string; value: string }

const initialFilters: Filter[] = [
  { id: "status", label: "Status", value: "Active" },
  { id: "dept", label: "Department", value: "Engineering" },
  { id: "priority", label: "Priority", value: "High" },
]

const statusOptions = ["Active", "Draft", "Archived", "Under Review"]
const deptOptions = ["Engineering", "Design", "Product", "Marketing", "Finance"]
const priorityOptions = ["Critical", "High", "Medium", "Low"]

const chipVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 400, damping: 25 } },
  exit: { opacity: 0, scale: 0.85, transition: { duration: 0.12 } },
}

export default function Filter01() {
  const [filters, setFilters] = useState<Filter[]>(initialFilters)
  const [sortBy, setSortBy] = useState("newest")

  function removeFilter(id: string) {
    setFilters((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      <div
        className="flex flex-wrap items-center gap-3 rounded-xl bg-card px-4 py-3 ring-1 ring-foreground/[0.06]"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
      >
        <div className="flex items-center gap-2 text-muted-foreground">
          <SlidersHorizontalIcon className="size-4" />
          <span className="text-xs font-semibold uppercase tracking-wide">Filters</span>
        </div>

        <div className="h-5 w-px bg-border" />

        <div className="flex flex-1 flex-wrap items-center gap-2">
          <AnimatePresence>
            {filters.map((filter) => (
              <motion.div
                key={filter.id}
                variants={chipVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                <Badge variant="secondary" className="gap-1.5 py-1 pr-1.5">
                  <span className="text-muted-foreground">{filter.label}:</span>
                  <span className="font-medium">{filter.value}</span>
                  <button
                    onClick={() => removeFilter(filter.id)}
                    className="ml-0.5 rounded-sm p-0.5 transition-colors hover:bg-foreground/10"
                  >
                    <XIcon className="size-3" />
                  </button>
                </Badge>
              </motion.div>
            ))}
          </AnimatePresence>

          {filters.length === 0 && (
            <span className="text-sm text-muted-foreground">No active filters</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {filters.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setFilters([])}>
              Clear all
            </Button>
          )}
          <div className="w-36">
            <Select value={sortBy} onValueChange={(val) => setSortBy(val ?? "")}>
              <SelectTrigger size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-mono tabular-nums font-medium text-foreground">247</span> results
        </p>
        <div className="flex gap-1.5">
          {[
            { id: "status", label: "Status", options: statusOptions },
            { id: "dept", label: "Department", options: deptOptions },
            { id: "priority", label: "Priority", options: priorityOptions },
          ].map((group) => (
            <Select
              key={group.id}
              value={filters.find((f) => f.id === group.id)?.value ?? ""}
              onValueChange={(val) => {
                if (!val) return
                setFilters((prev) => {
                  const exists = prev.find((f) => f.id === group.id)
                  if (exists) return prev.map((f) => (f.id === group.id ? { ...f, value: val } : f))
                  return [...prev, { id: group.id, label: group.label, value: val }]
                })
              }}
            >
              <SelectTrigger size="sm" className="w-auto gap-1.5">
                <span className="text-muted-foreground">{group.label}</span>
              </SelectTrigger>
              <SelectContent>
                {group.options.map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>
      </div>
    </div>
  )
}
