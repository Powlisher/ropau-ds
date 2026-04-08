"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const sections = [
  { label: "w-16", items: [{ w: "w-20" }, { w: "w-24" }, { w: "w-28" }, { w: "w-18" }] },
  { label: "w-20", items: [{ w: "w-24" }, { w: "w-20" }, { w: "w-16" }] },
  { label: "w-14", items: [{ w: "w-28" }, { w: "w-22" }] },
]

export default function Skeleton07() {
  return (
    <div className="mx-auto max-w-[240px]">
      <div
        className="flex h-[480px] flex-col rounded-xl bg-card ring-1 ring-border/60"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)" }}
      >
        <div className="border-b px-4 py-4">
          <div className="flex items-center gap-2.5">
            <Skeleton className="size-8 rounded-lg" />
            <Skeleton className="h-4 w-24 rounded" />
          </div>
        </div>

        <div className="flex-1 px-3 py-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-5"
          >
            {sections.map((section, si) => (
              <motion.div key={si} variants={itemVariants} className="space-y-1.5">
                <Skeleton className={`mb-2 h-2.5 ${section.label} rounded ml-2`} />
                {section.items.map((item, ii) => (
                  <motion.div
                    key={ii}
                    variants={itemVariants}
                    className="flex items-center gap-2.5 rounded-lg px-2 py-2"
                  >
                    <Skeleton className="size-4 rounded shrink-0" />
                    <Skeleton className={`h-3 ${item.w} rounded`} />
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="border-t px-3 py-3">
          <div className="flex items-center gap-2.5 px-2">
            <Skeleton className="size-7 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-3 w-20 rounded" />
              <Skeleton className="h-2 w-14 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
