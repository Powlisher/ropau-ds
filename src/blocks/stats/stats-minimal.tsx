"use client"

import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"

const stats = [
  { label: "ARR", value: "$2.4M" },
  { label: "MRR Growth", value: "8.3%" },
  { label: "Active Teams", value: "347" },
  { label: "Retention", value: "96.1%" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function StatsMinimal() {
  return (
    <motion.div
      className="flex flex-wrap items-center justify-center gap-x-0 gap-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat, i) => (
        <motion.div key={stat.label} variants={itemVariants} className="flex items-center">
          {i > 0 && <Separator orientation="vertical" className="mx-8 hidden h-12 sm:block lg:mx-12" />}
          <div className="text-center">
            <div className="text-4xl font-bold tabular-nums tracking-tight lg:text-5xl">{stat.value}</div>
            <div className="mt-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
