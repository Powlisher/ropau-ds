"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"

const filters = [
  { id: "all", label: "All", count: 342 },
  { id: "active", label: "Active", count: 186 },
  { id: "pending", label: "Pending", count: 47 },
  { id: "review", label: "In Review", count: 23 },
  { id: "approved", label: "Approved", count: 64 },
  { id: "rejected", label: "Rejected", count: 11 },
  { id: "archived", label: "Archived", count: 8 },
  { id: "draft", label: "Draft", count: 3 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const mockData = [
  { id: 1, name: "Lighthouse CI Integration", status: "Active", author: "Juliette Vasseur" },
  { id: 2, name: "Payment Gateway Migration", status: "Pending", author: "Romain Girard" },
  { id: 3, name: "Accessibility Audit Report", status: "In Review", author: "Lea Nguyen" },
  { id: 4, name: "Mobile Push Notification System", status: "Active", author: "Florian Blanc" },
  { id: 5, name: "Data Retention Policy Update", status: "Approved", author: "Manon Chevalier" },
]

export default function Filter09() {
  const [active, setActive] = useState("all")

  const filtered = active === "all"
    ? mockData
    : mockData.filter((d) => d.status.toLowerCase().replace(" ", "") === active.replace("_", "").toLowerCase() || d.status === filters.find((f) => f.id === active)?.label)

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      <ScrollArea className="w-full">
        <div className="flex gap-2 pb-1">
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              onClick={() => setActive(filter.id)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-all ${
                active === filter.id
                  ? "bg-foreground text-background ring-1 ring-foreground"
                  : "bg-card text-muted-foreground ring-1 ring-foreground/[0.06] hover:ring-foreground/10 hover:text-foreground"
              }`}
              style={active !== filter.id ? { boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" } : undefined}
            >
              {filter.label}
              <span className={`font-mono text-xs tabular-nums ${
                active === filter.id ? "text-background/60" : "text-muted-foreground/50"
              }`}>
                {filter.count}
              </span>
            </motion.button>
          ))}
        </div>
      </ScrollArea>

      <motion.div
        key={active}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        {filtered.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ y: -1 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className="flex items-center justify-between rounded-xl bg-card px-4 py-3 ring-1 ring-foreground/[0.06] transition-shadow hover:ring-foreground/10"
            style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
          >
            <div>
              <p className="font-heading text-sm font-medium tracking-tight">{item.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{item.author}</p>
            </div>
            <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${
              item.status === "Active" ? "bg-emerald-500/10 text-emerald-600" :
              item.status === "Pending" ? "bg-amber-500/10 text-amber-600" :
              item.status === "In Review" ? "bg-blue-500/10 text-blue-600" :
              item.status === "Approved" ? "bg-emerald-500/10 text-emerald-600" :
              "bg-muted text-muted-foreground"
            }`}>
              {item.status}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
