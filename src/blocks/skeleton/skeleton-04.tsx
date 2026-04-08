"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const cards = [
  { labelW: "w-20", valueW: "w-24", changeW: "w-14" },
  { labelW: "w-24", valueW: "w-16", changeW: "w-12" },
  { labelW: "w-16", valueW: "w-20", changeW: "w-16" },
  { labelW: "w-28", valueW: "w-14", changeW: "w-10" },
]

export default function Skeleton04() {
  return (
    <div className="mx-auto max-w-2xl">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {cards.map((card, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="rounded-xl bg-card px-4 py-4 ring-1 ring-border/60"
            style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
          >
            <Skeleton className={`h-3 ${card.labelW} rounded`} />
            <Skeleton className={`mt-3 h-7 ${card.valueW} rounded`} />
            <div className="mt-3 flex items-center gap-2">
              <Skeleton className={`h-4 ${card.changeW} rounded-full`} />
              <Skeleton className="h-2.5 w-12 rounded" />
            </div>
            <Skeleton className="mt-4 h-10 w-full rounded-md" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
