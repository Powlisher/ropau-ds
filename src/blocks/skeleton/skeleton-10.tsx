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

export default function Skeleton10() {
  return (
    <div className="mx-auto max-w-2xl">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Skeleton className="aspect-[21/9] w-full rounded-xl" />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6 flex items-center gap-3">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-2.5 w-24 rounded" />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-4 space-y-2">
          <Skeleton className="h-8 w-3/4 rounded" />
          <Skeleton className="h-5 w-1/2 rounded" />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-5 flex items-center gap-3">
          <Skeleton className="size-9 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-28 rounded" />
            <Skeleton className="h-2.5 w-20 rounded" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8 space-y-3">
          <Skeleton className="h-3.5 w-full rounded" />
          <Skeleton className="h-3.5 w-full rounded" />
          <Skeleton className="h-3.5 w-5/6 rounded" />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6 space-y-3">
          <Skeleton className="h-3.5 w-full rounded" />
          <Skeleton className="h-3.5 w-full rounded" />
          <Skeleton className="h-3.5 w-4/5 rounded" />
          <Skeleton className="h-3.5 w-2/3 rounded" />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="mt-2 mx-auto h-2.5 w-48 rounded" />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6 space-y-3">
          <Skeleton className="h-3.5 w-full rounded" />
          <Skeleton className="h-3.5 w-full rounded" />
          <Skeleton className="h-3.5 w-3/4 rounded" />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8 flex items-center gap-3 border-t pt-6">
          <Skeleton className="h-3 w-16 rounded" />
          <Skeleton className="h-3 w-12 rounded" />
          <Skeleton className="h-3 w-20 rounded" />
        </motion.div>
      </motion.div>
    </div>
  )
}
