"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const feedItems = [
  { titleW: "w-48", descW: "w-full", descW2: "w-3/4", hasImage: true },
  { titleW: "w-36", descW: "w-5/6", descW2: "w-2/3", hasImage: false },
  { titleW: "w-52", descW: "w-full", descW2: "w-4/5", hasImage: true },
  { titleW: "w-40", descW: "w-4/5", descW2: "w-1/2", hasImage: false },
  { titleW: "w-44", descW: "w-full", descW2: "w-3/5", hasImage: true },
]

export default function Skeleton05() {
  return (
    <div className="mx-auto max-w-lg">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-1"
      >
        {feedItems.map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="flex gap-3.5 rounded-xl px-4 py-4"
          >
            <div className="flex flex-col items-center gap-1.5 pt-1">
              <Skeleton className="size-8 rounded-full" />
              {i < feedItems.length - 1 && (
                <div className="w-px flex-1 bg-border/40" />
              )}
            </div>
            <div className="flex-1 min-w-0 pb-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3.5 w-20 rounded" />
                <Skeleton className="h-2.5 w-14 rounded" />
              </div>
              <Skeleton className={`mt-2 h-4 ${item.titleW} rounded`} />
              <div className="mt-2 space-y-1.5">
                <Skeleton className={`h-3 ${item.descW} rounded`} />
                <Skeleton className={`h-3 ${item.descW2} rounded`} />
              </div>
              {item.hasImage && (
                <Skeleton className="mt-3 h-32 w-full rounded-lg" />
              )}
              <div className="mt-3 flex items-center gap-4">
                <Skeleton className="h-3 w-12 rounded" />
                <Skeleton className="h-3 w-10 rounded" />
                <Skeleton className="h-3 w-8 rounded" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
