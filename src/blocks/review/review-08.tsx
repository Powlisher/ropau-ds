"use client"

import { Star, Reply } from "lucide-react"
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

const review = {
  author: "Maxime Dubois",
  initials: "MD",
  rating: 2,
  date: "Mar 25, 2026",
  text: "Waited 12 days for delivery when the listing said 3-5 business days. The product itself is fine but the shipping experience was frustrating. No tracking updates for the first week and support took 48 hours to respond.",
}

const response = {
  author: "Team Atelier",
  initials: "TA",
  role: "Business Owner",
  date: "Mar 26, 2026",
  text: "Hi Maxime, thank you for the honest feedback. You're absolutely right — that shipping delay was unacceptable and below our standards. We've identified a logistics bottleneck at our Lyon warehouse that caused delays for orders placed between March 18-24. This has since been resolved. We've credited your account with free express shipping on your next order. If there's anything else we can do, please reach out directly at care@atelier.com.",
}

export default function Review08() {
  return (
    <div className="mx-auto max-w-md">
      <motion.div
        className="rounded-xl bg-card ring-1 ring-border/60 overflow-hidden"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="px-5 py-5">
          <div className="flex items-start gap-3">
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
              <p className="mt-2.5 text-sm leading-relaxed text-foreground/85">{review.text}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-muted/30 px-5 py-4 border-t border-border/40"
        >
          <div className="flex items-center gap-1.5 mb-3">
            <Reply className="size-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Response from business</span>
          </div>
          <div className="flex items-start gap-3">
            <Avatar size="sm" className="mt-0.5 shrink-0">
              <AvatarFallback>{response.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-heading text-sm font-semibold tracking-tight text-foreground">{response.author}</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">{response.role}</span>
                <span className="text-[11px] font-mono tabular-nums tracking-wide text-muted-foreground">{response.date}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/85">{response.text}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
