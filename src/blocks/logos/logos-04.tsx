"use client"

import { motion } from "framer-motion"

const companies = [
  { name: "Meridian", letters: "MR" },
  { name: "Wavelength", letters: "WL" },
  { name: "Arcadia", letters: "AC" },
  { name: "Prism", letters: "PR" },
  { name: "Helix", letters: "HX" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Logos04() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full py-8">
      <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-6">
        <div className="h-px flex-1 max-w-16 bg-border/50" />
        <div className="flex items-center gap-2">
          <span className="font-mono text-2xl font-bold tabular-nums tracking-tight text-foreground">
            500+
          </span>
          <span className="text-xs text-muted-foreground/60">
            companies trust us
          </span>
        </div>
        <div className="h-px flex-1 max-w-16 bg-border/50" />
      </motion.div>

      <motion.div variants={itemVariants} className="flex items-center justify-center gap-6 flex-wrap">
        {companies.map((company) => (
          <div
            key={company.name}
            className="flex items-center gap-2 opacity-30"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded bg-foreground/8">
              <span className="text-[8px] font-bold tracking-wider text-foreground/50">
                {company.letters}
              </span>
            </div>
            <span className="font-heading text-xs font-semibold tracking-tight text-foreground">
              {company.name}
            </span>
          </div>
        ))}
        <div className="flex h-6 items-center gap-1 rounded-full bg-muted/50 px-2.5 ring-1 ring-foreground/5">
          <span className="text-[10px] font-medium text-muted-foreground/50">
            +495 more
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}
