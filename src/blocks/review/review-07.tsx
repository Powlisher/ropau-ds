"use client"

import { Star, ImageIcon } from "lucide-react"
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
  author: "Sophie Lefevre",
  initials: "SL",
  rating: 5,
  date: "Apr 1, 2026",
  title: "Stunning in person — photos don't do it justice",
  text: "The craftsmanship is immediately apparent when you unbox it. Every seam is precise, the weight feels substantial without being heavy, and the color is richer than what you see on screen. Already getting compliments from everyone in the office.",
  photos: [
    { id: 1, alt: "Product front view", color: "bg-amber-100 dark:bg-amber-900/30" },
    { id: 2, alt: "Detail shot of stitching", color: "bg-stone-200 dark:bg-stone-800/40" },
    { id: 3, alt: "Product in use on desk", color: "bg-sky-100 dark:bg-sky-900/30" },
    { id: 4, alt: "Size comparison", color: "bg-rose-100 dark:bg-rose-900/30" },
  ],
}

export default function Review07() {
  return (
    <div className="mx-auto max-w-md">
      <motion.div
        className="rounded-xl bg-card px-5 py-5 ring-1 ring-border/60"
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
          <h4 className="font-heading text-[15px] font-semibold tracking-tight text-foreground">{review.title}</h4>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{review.text}</p>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-4 grid grid-cols-4 gap-2">
          {review.photos.map((photo) => (
            <motion.div
              key={photo.id}
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              className={`aspect-square rounded-lg ${photo.color} ring-1 ring-border/40 flex items-center justify-center cursor-pointer`}
            >
              <ImageIcon className="size-5 text-foreground/20" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="mt-3 flex items-center gap-1.5">
          <ImageIcon className="size-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{review.photos.length} photos attached</span>
        </motion.div>
      </motion.div>
    </div>
  )
}
