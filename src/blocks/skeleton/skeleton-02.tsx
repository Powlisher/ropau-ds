"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const rowVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Skeleton02() {
  const columns = [
    { width: "w-28" },
    { width: "w-40" },
    { width: "w-20" },
    { width: "w-24" },
    { width: "w-16" },
  ]

  return (
    <div className="mx-auto max-w-2xl">
      <div
        className="overflow-hidden rounded-xl bg-card ring-1 ring-border/60"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)" }}
      >
        <div className="flex items-center gap-4 border-b border-border/50 px-5 py-3">
          {columns.map((col, i) => (
            <Skeleton key={i} className={`h-3 ${col.width} rounded`} />
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="divide-y divide-border/30"
        >
          {Array.from({ length: 7 }).map((_, rowIdx) => (
            <motion.div
              key={rowIdx}
              variants={rowVariants}
              className="flex items-center gap-4 px-5 py-3.5"
            >
              <div className="flex items-center gap-2.5 w-28">
                <Skeleton className="size-6 rounded-full shrink-0" />
                <Skeleton className="h-3 w-16 rounded" />
              </div>
              <Skeleton className={`h-3 rounded ${rowIdx % 3 === 0 ? "w-36" : rowIdx % 3 === 1 ? "w-32" : "w-28"}`} />
              <Skeleton className="h-3 w-14 rounded" />
              <Skeleton className={`h-5 rounded-full ${rowIdx % 2 === 0 ? "w-16" : "w-20"}`} />
              <Skeleton className="h-3 w-12 rounded" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
