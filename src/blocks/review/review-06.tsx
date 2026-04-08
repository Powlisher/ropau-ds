"use client"

import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const highlights = [
  { keyword: "Build quality", mentions: 47, sentiment: "positive" as const },
  { keyword: "Easy setup", mentions: 38, sentiment: "positive" as const },
  { keyword: "Customer support", mentions: 31, sentiment: "positive" as const },
  { keyword: "Value for money", mentions: 28, sentiment: "positive" as const },
  { keyword: "Battery life", mentions: 23, sentiment: "mixed" as const },
  { keyword: "Documentation", mentions: 19, sentiment: "mixed" as const },
  { keyword: "Mobile app", mentions: 14, sentiment: "negative" as const },
  { keyword: "Loading speed", mentions: 11, sentiment: "negative" as const },
]

const maxMentions = Math.max(...highlights.map((h) => h.mentions))

const sentimentColors = {
  positive: {
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    bar: "bg-emerald-400",
    text: "text-emerald-700 dark:text-emerald-400",
    ring: "ring-emerald-200/60 dark:ring-emerald-800/30",
  },
  mixed: {
    bg: "bg-amber-50 dark:bg-amber-950/20",
    bar: "bg-amber-400",
    text: "text-amber-700 dark:text-amber-400",
    ring: "ring-amber-200/60 dark:ring-amber-800/30",
  },
  negative: {
    bg: "bg-red-50 dark:bg-red-950/20",
    bar: "bg-red-400",
    text: "text-red-700 dark:text-red-400",
    ring: "ring-red-200/60 dark:ring-red-800/30",
  },
}

export default function Review06() {
  return (
    <div className="mx-auto max-w-md">
      <motion.div
        className="rounded-xl bg-card px-6 py-6 ring-1 ring-border/60"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">
            Most mentioned in reviews
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Based on 1,372 verified reviews
          </p>
        </motion.div>

        <div className="mt-5 space-y-2">
          {highlights.map((h) => {
            const colors = sentimentColors[h.sentiment]
            return (
              <motion.div
                key={h.keyword}
                variants={itemVariants}
                className={`flex items-center gap-3 rounded-lg ${colors.bg} ring-1 ${colors.ring} px-4 py-2.5`}
              >
                <span className="text-sm font-medium text-foreground min-w-0 flex-shrink-0">
                  {h.keyword}
                </span>
                <div className="relative flex-1 h-1.5 overflow-hidden rounded-full bg-foreground/[0.06]">
                  <motion.div
                    className={`absolute inset-y-0 left-0 rounded-full ${colors.bar}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(h.mentions / maxMentions) * 100}%` }}
                    transition={{ type: "spring" as const, stiffness: 80, damping: 18, delay: 0.2 }}
                  />
                </div>
                <span className={`text-xs font-mono tabular-nums tracking-wide ${colors.text} shrink-0`}>
                  {h.mentions}
                </span>
              </motion.div>
            )
          })}
        </div>

        <motion.div variants={itemVariants} className="mt-4 flex gap-4 border-t border-border/40 pt-4">
          {(["positive", "mixed", "negative"] as const).map((s) => (
            <div key={s} className="flex items-center gap-1.5">
              <div className={`size-2 rounded-full ${sentimentColors[s].bar}`} />
              <span className="text-xs text-muted-foreground capitalize">{s}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
