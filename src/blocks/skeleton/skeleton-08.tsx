"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const fields = [
  { labelW: "w-16", inputH: "h-9", full: true },
  { labelW: "w-20", inputH: "h-9", full: true },
  { labelW: "w-12", inputH: "h-9", half: true },
  { labelW: "w-24", inputH: "h-9", half: true },
  { labelW: "w-14", inputH: "h-24", full: true },
  { labelW: "w-28", inputH: "h-9", full: true },
]

export default function Skeleton08() {
  return (
    <div className="mx-auto max-w-md">
      <div
        className="rounded-xl bg-card px-6 py-6 ring-1 ring-border/60"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)" }}
      >
        <div className="mb-6 space-y-2">
          <Skeleton className="h-5 w-40 rounded" />
          <Skeleton className="h-3 w-56 rounded" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-5">
            {(() => {
              const elements: React.ReactNode[] = []
              let i = 0
              while (i < fields.length) {
                const field = fields[i]
                if ("half" in field && field.half && i + 1 < fields.length) {
                  const next = fields[i + 1]
                  elements.push(
                    <motion.div key={i} variants={itemVariants} className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Skeleton className={`h-3 ${field.labelW} rounded`} />
                        <Skeleton className={`${field.inputH} w-full rounded-lg`} />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className={`h-3 ${next.labelW} rounded`} />
                        <Skeleton className={`${next.inputH} w-full rounded-lg`} />
                      </div>
                    </motion.div>
                  )
                  i += 2
                } else {
                  elements.push(
                    <motion.div key={i} variants={itemVariants} className="space-y-2">
                      <Skeleton className={`h-3 ${field.labelW} rounded`} />
                      <Skeleton className={`${field.inputH} w-full rounded-lg`} />
                    </motion.div>
                  )
                  i++
                }
              }
              return elements
            })()}
          </div>

          <motion.div variants={itemVariants} className="mt-6 flex items-center justify-end gap-2">
            <Skeleton className="h-9 w-20 rounded-lg" />
            <Skeleton className="h-9 w-24 rounded-lg" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
