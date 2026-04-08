"use client"

import { Star } from "lucide-react"
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

const reviews = [
  {
    id: 1,
    author: "Marine Delacroix",
    initials: "MD",
    rating: 5,
    date: "Mar 28, 2026",
    text: "Completely transformed our design workflow. The component library is thoughtful and the token system makes customization effortless. Our team shipped 3 features in the time it used to take for one.",
  },
  {
    id: 2,
    author: "Samir Benali",
    initials: "SB",
    rating: 4,
    date: "Mar 14, 2026",
    text: "Solid foundation with great defaults. The typography scale is particularly well-considered. Only knocked a star because dark mode support could be more comprehensive for some edge components.",
  },
  {
    id: 3,
    author: "Clara Johansson",
    initials: "CJ",
    rating: 5,
    date: "Feb 22, 2026",
    text: "Best design system I've worked with in eight years. The attention to spacing and hierarchy makes every page feel intentional without extra effort.",
  },
]

export default function Review01() {
  return (
    <div className="mx-auto max-w-md">
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
            whileHover={{ y: -1 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className="rounded-xl bg-card px-5 py-5 ring-1 ring-border/60"
            style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
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
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
