"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const items = [
  { aspect: "aspect-square" },
  { aspect: "aspect-[4/5]" },
  { aspect: "aspect-square" },
  { aspect: "aspect-[3/4]" },
  { aspect: "aspect-[4/5]" },
  { aspect: "aspect-square" },
  { aspect: "aspect-square" },
  { aspect: "aspect-[3/4]" },
  { aspect: "aspect-square" },
]

export default function Skeleton09() {
  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-24 rounded" />
          <Skeleton className="h-3 w-32 rounded" />
        </div>
        <Skeleton className="h-8 w-20 rounded-lg" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-3 gap-2"
      >
        {items.map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="overflow-hidden rounded-xl ring-1 ring-border/40"
          >
            <Skeleton className={`${item.aspect} w-full`} />
            <div className="bg-card px-2.5 py-2 space-y-1">
              <Skeleton className={`h-2.5 ${i % 3 === 0 ? "w-full" : i % 3 === 1 ? "w-4/5" : "w-3/5"} rounded`} />
              <Skeleton className="h-2 w-12 rounded" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
