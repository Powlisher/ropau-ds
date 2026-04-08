"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const criteria = [
  { key: "quality", label: "Product quality", sublabel: "Materials, durability, finish" },
  { key: "value", label: "Value for money", sublabel: "Price vs what you received" },
  { key: "service", label: "Customer service", sublabel: "Response time, helpfulness" },
  { key: "shipping", label: "Shipping experience", sublabel: "Speed, packaging, tracking" },
]

export default function Rating08() {
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [hoveredStars, setHoveredStars] = useState<Record<string, number>>({})

  function setRating(key: string, value: number) {
    setRatings((prev) => ({ ...prev, [key]: value }))
  }

  function setHover(key: string, value: number) {
    setHoveredStars((prev) => ({ ...prev, [key]: value }))
  }

  const allRated = criteria.every((c) => ratings[c.key])
  const avg = allRated
    ? (criteria.reduce((sum, c) => sum + (ratings[c.key] || 0), 0) / criteria.length).toFixed(1)
    : null

  return (
    <div className="mx-auto max-w-md">
      <motion.div
        className="rounded-xl bg-card px-6 py-7 ring-1 ring-border/60"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">
            Rate your experience
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Help others by rating each aspect separately
          </p>
        </motion.div>

        <div className="mt-6 space-y-5">
          {criteria.map((c) => {
            const active = hoveredStars[c.key] || ratings[c.key] || 0
            return (
              <motion.div key={c.key} variants={itemVariants} className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{c.label}</p>
                  <p className="text-[12px] text-muted-foreground">{c.sublabel}</p>
                </div>
                <div className="flex gap-0.5 shrink-0">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
                      className="rounded p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                      onMouseEnter={() => setHover(c.key, star)}
                      onMouseLeave={() => setHover(c.key, 0)}
                      onClick={() => setRating(c.key, star)}
                    >
                      <Star
                        className={`size-5 transition-colors ${
                          star <= active ? "fill-amber-400 text-amber-400" : "fill-transparent text-foreground/20"
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {avg && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
            className="mt-6 flex items-center justify-between border-t border-border/40 pt-4"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-2xl font-bold tracking-tight tabular-nums text-foreground">{avg}</span>
              <span className="text-xs text-muted-foreground">overall average</span>
            </div>
            <Button size="sm">Submit ratings</Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
