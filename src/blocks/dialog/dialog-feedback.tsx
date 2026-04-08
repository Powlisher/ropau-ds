"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquareIcon } from "lucide-react"
import { motion } from "framer-motion"

const ratingLabels = ["Frustrating", "Needs work", "Decent", "Great", "Exceptional"]

export default function DialogFeedback() {
  const [rating, setRating] = useState<number | null>(null)
  const [comment, setComment] = useState("")

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          <MessageSquareIcon data-icon="inline-start" />
          Send feedback
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>How was your experience?</DialogTitle>
            <DialogDescription>Your feedback helps us improve. Be honest — we can take it.</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-3">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <motion.button
                    key={value}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    onClick={() => setRating(value)}
                    className={`flex size-11 items-center justify-center rounded-xl text-lg font-semibold transition-all ${
                      rating === value
                        ? "bg-primary text-primary-foreground ring-2 ring-primary/30"
                        : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    }`}
                    style={rating === value ? { boxShadow: "0 2px 8px rgba(20,20,15,0.08)" } : undefined}
                  >
                    {value}
                  </motion.button>
                ))}
              </div>
              {rating && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="text-sm font-medium text-primary"
                >
                  {ratingLabels[rating - 1]}
                </motion.p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Additional comments</label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What went well? What could be better?"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Not now</DialogClose>
            <Button disabled={!rating}>Submit feedback</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
