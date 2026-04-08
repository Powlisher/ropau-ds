"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Rating06() {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const active = hovered || rating

  const prompts: Record<number, string> = {
    1: "We're sorry to hear that. What went wrong?",
    2: "What could we improve?",
    3: "Thanks! Any suggestions to make it better?",
    4: "Great to hear! What did you enjoy most?",
    5: "Amazing! Care to share what made it special?",
  }

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
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className={`size-5 ${s <= rating ? "fill-amber-400 text-amber-400" : "text-foreground/20"}`} />
            ))}
          </div>
          <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">Thank you!</h3>
          <p className="text-sm text-muted-foreground">Your feedback has been recorded</p>
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
        <motion.h3 variants={itemVariants} className="text-center font-heading text-base font-semibold tracking-tight text-foreground">
          Rate your session
        </motion.h3>

        <motion.div variants={itemVariants} className="mt-5 flex justify-center gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
              className="rounded-lg p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
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

        <AnimatePresence mode="wait">
          {rating > 0 && (
            <motion.div
              key="comment"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 26 }}
              className="overflow-hidden"
            >
              <p className="mt-4 mb-2 text-sm text-muted-foreground">{prompts[rating]}</p>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="min-h-[80px] bg-muted/30 text-sm"
              />
              <div className="mt-3 flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => { setRating(0); setComment("") }}>
                  Skip
                </Button>
                <Button size="sm" onClick={() => setSubmitted(true)}>
                  Submit
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
