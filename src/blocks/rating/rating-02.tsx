"use client"

import { Star } from "lucide-react"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const distribution = [
  { stars: 5, count: 847, pct: 62 },
  { stars: 4, count: 293, pct: 21 },
  { stars: 3, count: 124, pct: 9 },
  { stars: 2, count: 67, pct: 5 },
  { stars: 1, count: 41, pct: 3 },
]

const totalReviews = 1372
const avgRating = 4.3

export default function Rating02() {
  return (
    <div className="mx-auto max-w-sm">
      <motion.div
        className="rounded-xl bg-card px-6 py-6 ring-1 ring-border/60"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex items-end gap-3 mb-5">
          <span className="font-heading text-4xl font-bold tracking-tight text-foreground tabular-nums">
            {avgRating}
          </span>
          <div className="pb-1">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`size-4 ${s <= Math.round(avgRating) ? "fill-amber-400 text-amber-400" : "fill-transparent text-foreground/20"}`}
                />
              ))}
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground font-mono tabular-nums tracking-wide">
              {totalReviews.toLocaleString()} reviews
            </p>
          </div>
        </motion.div>

        <div className="space-y-2">
          {distribution.map((row) => (
            <motion.div key={row.stars} variants={itemVariants} className="flex items-center gap-3">
              <span className="w-6 text-right text-xs font-medium text-foreground/70 tabular-nums">
                {row.stars}
              </span>
              <Star className="size-3.5 fill-amber-400 text-amber-400 shrink-0" />
              <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-foreground/[0.06]">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-amber-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${row.pct}%` }}
                  transition={{ type: "spring" as const, stiffness: 80, damping: 18, delay: 0.2 }}
                />
              </div>
              <span className="w-9 text-right text-xs font-mono tabular-nums tracking-wide text-muted-foreground">
                {row.pct}%
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
