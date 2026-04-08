"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 400, damping: 22 } },
}

export default function Rating01() {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)

  const labels = ["", "Poor", "Fair", "Good", "Very good", "Excellent"]
  const active = hovered || rating

  return (
    <div className="mx-auto max-w-xs">
      <div
        className="flex flex-col items-center gap-5 rounded-xl bg-card px-8 py-7 ring-1 ring-border/60"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
      >
        <div>
          <h3 className="text-center font-heading text-base font-semibold tracking-tight text-foreground">
            How was your experience?
          </h3>
          <p className="mt-1 text-center text-sm text-muted-foreground">
            Your feedback helps us improve
          </p>
        </div>

        <motion.div
          className="flex gap-1.5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              variants={itemVariants}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
              className="rounded-lg p-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(star)}
            >
              <Star
                className={`size-8 transition-colors ${
                  star <= active
                    ? "fill-amber-400 text-amber-400"
                    : "fill-transparent text-foreground/20"
                }`}
              />
            </motion.button>
          ))}
        </motion.div>

        <motion.p
          key={active}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
          className="h-5 text-sm font-medium text-foreground/70"
        >
          {active ? labels[active] : "\u00A0"}
        </motion.p>
      </div>
    </div>
  )
}
