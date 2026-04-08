"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 350, damping: 22 } },
}

type Segment = "detractor" | "passive" | "promoter"

function getSegment(n: number): Segment {
  if (n <= 6) return "detractor"
  if (n <= 8) return "passive"
  return "promoter"
}

const segmentStyles: Record<Segment, { bg: string; ring: string; label: string; color: string }> = {
  detractor: { bg: "bg-red-50 dark:bg-red-950/30", ring: "ring-red-200 dark:ring-red-800/50", label: "Detractor", color: "text-red-600 dark:text-red-400" },
  passive: { bg: "bg-amber-50 dark:bg-amber-950/30", ring: "ring-amber-200 dark:ring-amber-800/50", label: "Passive", color: "text-amber-600 dark:text-amber-400" },
  promoter: { bg: "bg-emerald-50 dark:bg-emerald-950/30", ring: "ring-emerald-200 dark:ring-emerald-800/50", label: "Promoter", color: "text-emerald-600 dark:text-emerald-400" },
}

export default function Rating07() {
  const [selected, setSelected] = useState<number | null>(null)

  const segment = selected !== null ? getSegment(selected) : null
  const style = segment ? segmentStyles[segment] : null

  return (
    <div className="mx-auto max-w-lg">
      <div
        className="rounded-xl bg-card px-6 py-7 ring-1 ring-border/60"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
      >
        <h3 className="text-center font-heading text-base font-semibold tracking-tight text-foreground">
          How likely are you to recommend us?
        </h3>
        <p className="mt-1 mb-6 text-center text-sm text-muted-foreground">
          On a scale of 0 to 10
        </p>

        <motion.div
          className="flex justify-center gap-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Array.from({ length: 11 }, (_, i) => i).map((n) => {
            const seg = getSegment(n)
            const isSelected = selected === n
            return (
              <motion.button
                key={n}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 22 }}
                onClick={() => setSelected(n)}
                className={`flex size-9 items-center justify-center rounded-lg text-sm font-semibold tabular-nums ring-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                  isSelected
                    ? `${segmentStyles[seg].bg} ${segmentStyles[seg].ring} ring-2 ${segmentStyles[seg].color}`
                    : "bg-muted/40 ring-border/40 text-foreground/70 hover:bg-muted"
                }`}
              >
                {n}
              </motion.button>
            )
          })}
        </motion.div>

        <div className="mt-3 flex justify-between px-0.5">
          <span className="text-[11px] tracking-wide text-muted-foreground">Not likely</span>
          <span className="text-[11px] tracking-wide text-muted-foreground">Extremely likely</span>
        </div>

        <div className="mt-4 flex justify-center gap-6 border-t border-border/40 pt-4">
          {(["detractor", "passive", "promoter"] as Segment[]).map((seg) => (
            <div key={seg} className="flex items-center gap-1.5">
              <div className={`size-2.5 rounded-full ${
                seg === "detractor" ? "bg-red-400" : seg === "passive" ? "bg-amber-400" : "bg-emerald-400"
              }`} />
              <span className={`text-xs font-medium ${
                segment === seg ? segmentStyles[seg].color : "text-muted-foreground"
              }`}>
                {segmentStyles[seg].label}
              </span>
              <span className="text-[11px] font-mono tabular-nums text-muted-foreground/60">
                {seg === "detractor" ? "0-6" : seg === "passive" ? "7-8" : "9-10"}
              </span>
            </div>
          ))}
        </div>

        {style && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
            className={`mt-4 rounded-lg ${style.bg} ${style.ring} ring-1 px-4 py-2.5 text-center`}
          >
            <span className={`text-sm font-medium ${style.color}`}>
              {segment === "detractor" && "We'd love to understand how we can improve."}
              {segment === "passive" && "Almost there! What would make us a 9 or 10?"}
              {segment === "promoter" && "Thank you! You're one of our biggest advocates."}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  )
}
