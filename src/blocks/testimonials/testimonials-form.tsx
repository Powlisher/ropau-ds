"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

function StarRating({
  rating,
  onChange,
}: {
  rating: number
  onChange: (r: number) => void
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
          onClick={() => onChange(star)}
          className="p-0.5"
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={star <= rating ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
            className={
              star <= rating ? "text-amber-500" : "text-muted-foreground/40"
            }
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </motion.button>
      ))}
    </div>
  )
}

export default function TestimonialsForm() {
  const [rating, setRating] = useState(0)

  return (
    <section className="mx-auto max-w-lg px-6 py-20 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card
            style={{
              boxShadow:
                "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)",
            }}
          >
            <CardHeader>
              <CardTitle className="text-lg">Share your experience</CardTitle>
              <CardDescription>
                Your feedback helps other teams make informed decisions. All
                reviews are verified before publication.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Rating
                  </label>
                  <StarRating rating={rating} onChange={setRating} />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label
                    htmlFor="review"
                    className="text-sm font-medium text-foreground"
                  >
                    Your review
                  </label>
                  <Textarea
                    id="review"
                    placeholder="What has your experience been like?"
                    className="min-h-24"
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-2 gap-3"
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-foreground"
                    >
                      Name
                    </label>
                    <Input id="name" placeholder="Jane Smith" />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="company"
                      className="text-sm font-medium text-foreground"
                    >
                      Company
                    </label>
                    <Input id="company" placeholder="Acme Corp" />
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-between pt-2"
                >
                  <p className="text-xs text-muted-foreground">
                    Reviews are moderated within 24 hours
                  </p>
                  <Button type="submit">Submit review</Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}
