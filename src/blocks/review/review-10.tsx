"use client"

import { useState } from "react"
import { Star, Check, X, Flag, Eye } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

interface QueueItem {
  id: number
  author: string
  initials: string
  rating: number
  date: string
  text: string
  flagReason: string | null
}

const initialQueue: QueueItem[] = [
  {
    id: 1,
    author: "Victor Lemaire",
    initials: "VL",
    rating: 1,
    date: "Apr 6, 2026",
    text: "SCAM! Don't buy this garbage. Totally fake product I want my money back right now. The worst purchase I've ever made in my entire life bar none.",
    flagReason: "Potential spam",
  },
  {
    id: 2,
    author: "Amelie Blanc",
    initials: "AB",
    rating: 5,
    date: "Apr 5, 2026",
    text: "Absolutely love it! The packaging was beautiful and the product works exactly as described. Already ordered a second one for my sister's birthday next month.",
    flagReason: null,
  },
  {
    id: 3,
    author: "Pierre Gagnon",
    initials: "PG",
    rating: 3,
    date: "Apr 5, 2026",
    text: "It's okay. Works fine for basic tasks but I wouldn't recommend it for heavy daily use. The competitor product from Nomade is similar but comes with better accessories included in the box.",
    flagReason: "Mentions competitor",
  },
  {
    id: 4,
    author: "Lena Fischer",
    initials: "LF",
    rating: 4,
    date: "Apr 4, 2026",
    text: "Surprised by the quality at this price. The brushed aluminum finish is premium and the mechanism operates smoothly. Minor quibble: instruction manual could be clearer for assembly step 4.",
    flagReason: null,
  },
]

export default function Review10() {
  const [queue, setQueue] = useState(initialQueue)

  function handleAction(id: number) {
    setQueue((q) => q.filter((item) => item.id !== id))
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-5 flex items-baseline justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">Moderation queue</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            <span className="font-mono tabular-nums">{queue.length}</span> reviews pending
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <Eye className="size-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Requires manual review</span>
        </div>
      </div>

      <motion.div
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {queue.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              layout
              exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
              className="rounded-xl bg-card px-5 py-4 ring-1 ring-border/60"
              style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
            >
              <div className="flex items-start gap-3">
                <Avatar size="sm" className="mt-0.5 shrink-0">
                  <AvatarFallback>{item.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-heading text-sm font-semibold tracking-tight text-foreground">{item.author}</span>
                    {item.flagReason && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 ring-1 ring-amber-200/60 dark:ring-amber-800/40">
                        <Flag className="size-2.5 text-amber-600 dark:text-amber-400" />
                        <span className="text-[10px] font-medium text-amber-700 dark:text-amber-400">{item.flagReason}</span>
                      </span>
                    )}
                    <span className="ml-auto text-[11px] font-mono tabular-nums tracking-wide text-muted-foreground shrink-0">{item.date}</span>
                  </div>
                  <div className="mt-1 flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`size-3 ${s <= item.rating ? "fill-amber-400 text-amber-400" : "fill-transparent text-foreground/20"}`} />
                    ))}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">{item.text}</p>
                  <div className="mt-3 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 gap-1.5 text-emerald-700 border-emerald-200 hover:bg-emerald-50 dark:text-emerald-400 dark:border-emerald-800/50 dark:hover:bg-emerald-950/30"
                      onClick={() => handleAction(item.id)}
                    >
                      <Check className="size-3.5" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 gap-1.5 text-red-700 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800/50 dark:hover:bg-red-950/30"
                      onClick={() => handleAction(item.id)}
                    >
                      <X className="size-3.5" />
                      Reject
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 text-muted-foreground">
                      Skip
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {queue.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
            className="flex flex-col items-center gap-2 rounded-xl bg-card px-8 py-12 ring-1 ring-border/60 text-center"
            style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)" }}
          >
            <Check className="size-8 text-emerald-500" />
            <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">All caught up</h3>
            <p className="text-sm text-muted-foreground">No reviews pending moderation</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
