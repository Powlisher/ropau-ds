"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Feedback01() {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const active = hovered || rating

  if (submitted) {
    return (
      <div className="mx-auto max-w-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
          className="flex flex-col items-center gap-3 rounded-xl bg-card px-8 py-10 ring-1 ring-border/60 text-center"
          style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
        >
          <div className="flex size-12 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/30 ring-1 ring-emerald-200/60 dark:ring-emerald-800/40">
            <Star className="size-5 fill-emerald-500 text-emerald-500" />
          </div>
          <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">Feedback received</h3>
          <p className="text-sm text-muted-foreground">Your input shapes what we build next</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-sm">
      <motion.div
        className="rounded-xl bg-card px-6 py-7 ring-1 ring-border/60"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">Share your feedback</h3>
          <p className="mt-1 text-sm text-muted-foreground">How would you rate your overall experience?</p>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-5 flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
              className="rounded-lg p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(star)}
            >
              <Star
                className={`size-7 transition-colors ${
                  star <= active ? "fill-amber-400 text-amber-400" : "fill-transparent text-foreground/20"
                }`}
              />
            </motion.button>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="mt-4">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us more about your experience (optional)"
            className="min-h-[100px] bg-muted/30 text-sm"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-4 flex justify-end">
          <Button size="sm" disabled={!rating} onClick={() => setSubmitted(true)}>
            Send feedback
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
