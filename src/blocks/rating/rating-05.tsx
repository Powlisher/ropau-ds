"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 350, damping: 22 } },
}

function getColor(n: number): string {
  if (n <= 2) return "bg-red-500"
  if (n <= 4) return "bg-orange-500"
  if (n <= 6) return "bg-amber-500"
  if (n <= 8) return "bg-emerald-500"
  return "bg-green-500"
}

function getRingColor(n: number): string {
  if (n <= 2) return "ring-red-300 dark:ring-red-700"
  if (n <= 4) return "ring-orange-300 dark:ring-orange-700"
  if (n <= 6) return "ring-amber-300 dark:ring-amber-700"
  if (n <= 8) return "ring-emerald-300 dark:ring-emerald-700"
  return "ring-green-300 dark:ring-green-700"
}

function getLabel(n: number): string {
  if (n <= 2) return "Poor"
  if (n <= 4) return "Below average"
  if (n <= 6) return "Average"
  if (n <= 8) return "Very good"
  return "Exceptional"
}

export default function Rating05() {
  const [selected, setSelected] = useState<number | null>(null)
  const [hovered, setHovered] = useState<number | null>(null)

  const active = hovered ?? selected

  return (
    <div className="mx-auto max-w-md">
      <div
        className="rounded-xl bg-card px-6 py-7 ring-1 ring-border/60"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
      >
        <h3 className="text-center font-heading text-base font-semibold tracking-tight text-foreground">
          Rate this product
        </h3>
        <p className="mt-1 mb-6 text-center text-sm text-muted-foreground">
          Select a score from 1 to 10
        </p>

        <motion.div
          className="flex justify-center gap-1.5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <motion.button
              key={n}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 22 }}
              onMouseEnter={() => setHovered(n)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(n)}
              className={`flex size-9 items-center justify-center rounded-lg text-sm font-semibold tabular-nums ring-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                selected === n
                  ? `${getColor(n)} ${getRingColor(n)} ring-2 text-white`
                  : hovered === n
                    ? `${getColor(n)}/10 ${getRingColor(n)} ring-1 text-foreground`
                    : "bg-muted/40 ring-border/40 text-foreground/70 hover:bg-muted"
              }`}
            >
              {n}
            </motion.button>
          ))}
        </motion.div>

        <div className="mt-4 flex justify-between px-0.5">
          <span className="text-[11px] tracking-wide text-muted-foreground">Not at all</span>
          <span className="text-[11px] tracking-wide text-muted-foreground">Perfect</span>
        </div>

        {active && (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
            className="mt-4 text-center"
          >
            <span className="text-sm font-medium text-foreground/80">{getLabel(active)}</span>
          </motion.div>
        )}
      </div>
    </div>
  )
}
