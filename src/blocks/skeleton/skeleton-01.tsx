"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Skeleton01() {
  return (
    <div className="mx-auto max-w-sm">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="rounded-xl bg-card p-4 ring-1 ring-border/60"
            style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
          >
            <Skeleton className="aspect-[16/10] w-full rounded-lg" />
            <div className="mt-3.5 space-y-2">
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-3.5 w-full rounded" />
              <Skeleton className="h-3.5 w-5/6 rounded" />
            </div>
            <div className="mt-4 flex items-center gap-2.5">
              <Skeleton className="size-7 rounded-full" />
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-24 rounded" />
                <Skeleton className="h-2.5 w-16 rounded" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
