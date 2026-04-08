"use client"

import { Star, BadgeCheck } from "lucide-react"
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
    author: "Raphael Vidal",
    initials: "RV",
    rating: 5,
    date: "Apr 3, 2026",
    verified: true,
    text: "Exceeded expectations. The build quality is exceptional — no flex, no creaks. The matte finish resists fingerprints better than anything I've owned. Already recommended it to three colleagues.",
    product: "Ergonomic Standing Desk Pro",
  },
  {
    id: 2,
    author: "Ines Faure",
    initials: "IF",
    rating: 4,
    date: "Mar 22, 2026",
    verified: true,
    text: "Very comfortable for long sessions. The lumbar support adjusts smoothly and the mesh breathes well. Armrests could be wider but overall a significant upgrade from my old chair.",
    product: "Adaptive Mesh Chair",
  },
  {
    id: 3,
    author: "Julien Arnaud",
    initials: "JA",
    rating: 3,
    date: "Mar 8, 2026",
    verified: false,
    text: "Decent monitor arm but the clamp doesn't grip well on thick desks. Had to use the grommet mount instead. Smooth movement once installed though.",
    product: "Dual Monitor Arm",
  },
]

export default function Review05() {
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
            style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
          >
            <div className="flex items-start gap-3">
              <Avatar size="sm" className="mt-0.5 shrink-0">
                <AvatarFallback>{review.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-heading text-sm font-semibold tracking-tight text-foreground">
                    {review.author}
                  </span>
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 ring-1 ring-emerald-200/60 dark:ring-emerald-800/40">
                      <BadgeCheck className="size-3 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400">Verified purchase</span>
                    </span>
                  )}
                  <span className="ml-auto text-[11px] font-mono tabular-nums tracking-wide text-muted-foreground shrink-0">
                    {review.date}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{review.product}</p>
                <div className="mt-1.5 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`size-3.5 ${s <= review.rating ? "fill-amber-400 text-amber-400" : "fill-transparent text-foreground/20"}`} />
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
