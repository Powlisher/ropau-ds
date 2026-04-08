"use client"

import { useState } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { ArrowUpDownIcon } from "lucide-react"
import { motion } from "framer-motion"

const sortOptions = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "az", label: "Name A-Z" },
  { value: "za", label: "Name Z-A" },
  { value: "popular", label: "Most popular" },
  { value: "updated", label: "Recently updated" },
]

const mockItems = [
  { id: 1, name: "Brand Identity Refresh", date: "Apr 6, 2026", views: 2847 },
  { id: 2, name: "Infrastructure Cost Analysis", date: "Apr 3, 2026", views: 1293 },
  { id: 3, name: "Q1 Engineering Retrospective", date: "Mar 31, 2026", views: 876 },
  { id: 4, name: "Customer Journey Mapping", date: "Mar 27, 2026", views: 4102 },
  { id: 5, name: "Security Incident Response Plan", date: "Mar 22, 2026", views: 561 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Sorting01() {
  const [sortBy, setSortBy] = useState("newest")

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-mono tabular-nums font-medium text-foreground">{mockItems.length}</span> documents
        </p>
        <div className="flex items-center gap-2">
          <ArrowUpDownIcon className="size-3.5 text-muted-foreground" />
          <Select value={sortBy} onValueChange={(val) => setSortBy(val ?? "")}>
            <SelectTrigger size="sm" className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <motion.div
        key={sortBy}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        {mockItems.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ y: -1 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className="flex cursor-pointer items-center justify-between rounded-xl bg-card px-4 py-3.5 ring-1 ring-foreground/[0.06] transition-shadow hover:ring-foreground/10"
            style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
          >
            <div className="min-w-0 flex-1">
              <p className="truncate font-heading text-sm font-medium tracking-tight">{item.name}</p>
              <p className="mt-0.5 font-mono text-xs tabular-nums tracking-wide text-muted-foreground/60">{item.date}</p>
            </div>
            <span className="ml-4 shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
              {item.views.toLocaleString()} views
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
