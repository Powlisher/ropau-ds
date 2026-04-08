"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

export default function Review03() {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const active = hovered || rating

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
          <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">Write a review</h3>
          <p className="mt-1 text-sm text-muted-foreground">Share your experience to help others decide</p>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6">
          <label className="text-sm font-medium text-foreground">Overall rating</label>
          <div className="mt-2 flex gap-1">
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
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-5">
          <label className="text-sm font-medium text-foreground">Review title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summarize your experience"
            className="mt-1.5 bg-muted/30"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-4">
          <label className="text-sm font-medium text-foreground">Your review</label>
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What did you like or dislike? How did it compare to your expectations?"
            className="mt-1.5 min-h-[120px] bg-muted/30"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-5 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {body.length > 0 ? `${body.length} characters` : "Minimum 50 characters"}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Cancel</Button>
            <Button size="sm" disabled={!rating || body.length < 50}>Submit review</Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
