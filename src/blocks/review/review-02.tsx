"use client"

import { useState } from "react"
import { Star, ThumbsUp, ThumbsDown } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const initialReviews = [
  {
    id: 1,
    author: "Adrien Moreau",
    initials: "AM",
    rating: 5,
    date: "Apr 2, 2026",
    text: "Migrated our entire frontend to this in under a week. The spacing tokens alone saved us from our old inconsistent mess. Highly recommend for any team tired of fighting their design system.",
    helpful: 34,
    unhelpful: 2,
  },
  {
    id: 2,
    author: "Lina Petrova",
    initials: "LP",
    rating: 3,
    date: "Mar 19, 2026",
    text: "Good components but the documentation could use more real-world examples. Spent time figuring out how to compose some patterns that should be obvious from the docs.",
    helpful: 18,
    unhelpful: 5,
  },
  {
    id: 3,
    author: "Hugo Deschamps",
    initials: "HD",
    rating: 4,
    date: "Mar 7, 2026",
    text: "The animation system with Framer Motion springs baked in is a game changer. Every interaction feels premium out of the box. Would love to see more chart components.",
    helpful: 27,
    unhelpful: 1,
  },
]

export default function Review02() {
  const [reviews, setReviews] = useState(initialReviews)
  const [voted, setVoted] = useState<Record<string, "up" | "down">>({})

  function vote(reviewId: number, type: "up" | "down") {
    const key = String(reviewId)
    const prev = voted[key]
    if (prev === type) return

    setReviews((rs) =>
      rs.map((r) => {
        if (r.id !== reviewId) return r
        let { helpful, unhelpful } = r
        if (prev === "up") helpful--
        if (prev === "down") unhelpful--
        if (type === "up") helpful++
        else unhelpful++
        return { ...r, helpful, unhelpful }
      })
    )
    setVoted((v) => ({ ...v, [key]: type }))
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-4">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Customer reviews</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">{reviews.length} reviews</p>
      </div>
      <motion.div
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            variants={itemVariants}
            className="rounded-xl bg-card px-5 py-5 ring-1 ring-border/60"
            style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
          >
            <div className="flex items-start gap-3">
              <Avatar size="sm" className="mt-0.5 shrink-0">
                <AvatarFallback>{review.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-heading text-sm font-semibold tracking-tight text-foreground">
                    {review.author}
                  </span>
                  <span className="text-[11px] font-mono tabular-nums tracking-wide text-muted-foreground shrink-0">
                    {review.date}
                  </span>
                </div>
                <div className="mt-1 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`size-3.5 ${s <= review.rating ? "fill-amber-400 text-amber-400" : "fill-transparent text-foreground/20"}`}
                    />
                  ))}
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-foreground/85">{review.text}</p>
                <div className="mt-3 flex items-center gap-4 border-t border-border/40 pt-3">
                  <span className="text-xs text-muted-foreground">Was this helpful?</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => vote(review.id, "up")}
                      className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors hover:bg-muted/50 ${
                        voted[String(review.id)] === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
                      }`}
                    >
                      <ThumbsUp className={`size-3.5 ${voted[String(review.id)] === "up" ? "fill-current" : ""}`} />
                      <span className="tabular-nums">{review.helpful}</span>
                    </button>
                    <button
                      onClick={() => vote(review.id, "down")}
                      className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors hover:bg-muted/50 ${
                        voted[String(review.id)] === "down" ? "text-red-600 dark:text-red-400" : "text-muted-foreground"
                      }`}
                    >
                      <ThumbsDown className={`size-3.5 ${voted[String(review.id)] === "down" ? "fill-current" : ""}`} />
                      <span className="tabular-nums">{review.unhelpful}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
