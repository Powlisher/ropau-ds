"use client"

import { Star, Plus, Minus } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const review = {
  author: "Elodie Marchand",
  initials: "EM",
  rating: 4,
  date: "Mar 31, 2026",
  title: "Great daily driver with a few quirks",
  text: "Been using this for about two months now as my primary tool. The core experience is polished and the learning curve was minimal. A few rough edges remain but nothing deal-breaking.",
  pros: [
    "Intuitive interface that doesn't require reading docs",
    "Excellent keyboard shortcuts — barely touch the mouse",
    "Real-time collaboration works flawlessly across timezones",
    "Export options cover every format we needed",
  ],
  cons: [
    "Search is slow when dealing with 500+ items",
    "Mobile app lacks offline support",
    "No way to bulk-edit tags currently",
  ],
}

export default function Review04() {
  return (
    <div className="mx-auto max-w-md">
      <motion.div
        className="rounded-xl bg-card px-6 py-6 ring-1 ring-border/60"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex items-start gap-3">
          <Avatar size="sm" className="mt-0.5 shrink-0">
            <AvatarFallback>{review.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-heading text-sm font-semibold tracking-tight text-foreground">{review.author}</span>
              <span className="text-[11px] font-mono tabular-nums tracking-wide text-muted-foreground shrink-0">{review.date}</span>
            </div>
            <div className="mt-1 flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`size-3.5 ${s <= review.rating ? "fill-amber-400 text-amber-400" : "fill-transparent text-foreground/20"}`} />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-4">
          <h4 className="font-heading text-base font-semibold tracking-tight text-foreground">{review.title}</h4>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{review.text}</p>
        </motion.div>

        <div className="mt-5 grid grid-cols-2 gap-4">
          <motion.div variants={itemVariants} className="rounded-lg bg-emerald-50/60 dark:bg-emerald-950/20 px-4 py-3 ring-1 ring-emerald-200/60 dark:ring-emerald-800/30">
            <div className="flex items-center gap-1.5 mb-2">
              <Plus className="size-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">Pros</span>
            </div>
            <ul className="space-y-1.5">
              {review.pros.map((pro, i) => (
                <li key={i} className="text-[13px] leading-snug text-foreground/80">{pro}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-lg bg-red-50/60 dark:bg-red-950/20 px-4 py-3 ring-1 ring-red-200/60 dark:ring-red-800/30">
            <div className="flex items-center gap-1.5 mb-2">
              <Minus className="size-3.5 text-red-600 dark:text-red-400" />
              <span className="text-xs font-semibold uppercase tracking-wide text-red-700 dark:text-red-400">Cons</span>
            </div>
            <ul className="space-y-1.5">
              {review.cons.map((con, i) => (
                <li key={i} className="text-[13px] leading-snug text-foreground/80">{con}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
