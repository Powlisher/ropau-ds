"use client"

import { useState } from "react"
import { MessageCircle, X, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"

export default function Feedback05() {
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const active = hovered || rating

  return (
    <div className="relative mx-auto flex h-[400px] max-w-md items-end justify-end rounded-xl bg-muted/20 p-6 ring-1 ring-border/40">
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-muted-foreground/50">
        Your app content
      </span>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring" as const, stiffness: 350, damping: 25 }}
            className="absolute bottom-20 right-6 w-72 rounded-xl bg-card ring-1 ring-border/60 overflow-hidden"
            style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04), 0 16px 32px rgba(20,20,15,0.04)" }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
              <h4 className="font-heading text-sm font-semibold tracking-tight text-foreground">Quick feedback</h4>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-2 px-4 py-8 text-center"
              >
                <h4 className="font-heading text-sm font-semibold tracking-tight text-foreground">Thank you!</h4>
                <p className="text-xs text-muted-foreground">We read every piece of feedback</p>
              </motion.div>
            ) : (
              <div className="px-4 py-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
                      className="rounded p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                      onMouseEnter={() => setHovered(star)}
                      onMouseLeave={() => setHovered(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star
                        className={`size-5 transition-colors ${
                          star <= active ? "fill-amber-400 text-amber-400" : "fill-transparent text-foreground/20"
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What's on your mind?"
                  className="mt-3 min-h-[72px] bg-muted/30 text-sm"
                />
                <div className="mt-3 flex justify-end">
                  <Button size="sm" disabled={!rating} onClick={() => setSubmitted(true)}>
                    Send
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
        onClick={() => { setOpen(!open); setSubmitted(false) }}
        className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
        style={{ boxShadow: "0 2px 4px rgba(20,20,15,0.08), 0 4px 8px rgba(20,20,15,0.08), 0 8px 16px rgba(20,20,15,0.06)" }}
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
      </motion.button>
    </div>
  )
}
