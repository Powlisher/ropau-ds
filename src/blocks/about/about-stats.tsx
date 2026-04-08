"use client"

import { motion } from "framer-motion"

const stats = [
  { value: "42", label: "Team Members", suffix: "" },
  { value: "10,847", label: "Teams Using Ropau", suffix: "" },
  { value: "23", label: "Countries", suffix: "" },
  { value: "3.5", label: "Years Building", suffix: "" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function AboutStats() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-5 lg:grid-cols-4"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={itemVariants}
          className="flex flex-col items-center gap-2 rounded-2xl bg-card px-6 py-8 ring-1 ring-foreground/5 text-center"
          style={{
            boxShadow:
              "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
          }}
        >
          <span className="font-heading text-4xl font-bold tracking-tight tabular-nums text-foreground">
            {stat.value}
            {stat.suffix}
          </span>
          <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  )
}
