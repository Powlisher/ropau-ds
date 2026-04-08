"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Skeleton03() {
  return (
    <div className="mx-auto max-w-sm">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="rounded-xl bg-card px-6 py-7 ring-1 ring-border/60"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)" }}
      >
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <Skeleton className="size-20 rounded-full" />
          <div className="mt-4 space-y-2 text-center w-full">
            <Skeleton className="mx-auto h-5 w-36 rounded" />
            <Skeleton className="mx-auto h-3.5 w-24 rounded" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-5 space-y-2">
          <Skeleton className="h-3.5 w-full rounded" />
          <Skeleton className="h-3.5 w-4/5 rounded" />
          <Skeleton className="h-3.5 w-3/5 rounded" />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6 flex items-center justify-center gap-5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <Skeleton className="h-5 w-10 rounded" />
              <Skeleton className="h-2.5 w-12 rounded" />
            </div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6 flex gap-2">
          <Skeleton className="h-9 flex-1 rounded-lg" />
          <Skeleton className="h-9 flex-1 rounded-lg" />
        </motion.div>
      </motion.div>
    </div>
  )
}
