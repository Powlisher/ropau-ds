"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 350, damping: 22 } },
}

const reactions = [
  { value: "love", face: "\u2764\uFE0F", label: "Love it" },
  { value: "like", face: "\uD83D\uDC4D", label: "Like it" },
  { value: "meh", face: "\uD83D\uDE10", label: "Meh" },
  { value: "confused", face: "\uD83D\uDE15", label: "Confused" },
  { value: "dislike", face: "\uD83D\uDC4E", label: "Dislike" },
]

export default function Feedback09() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="mx-auto max-w-xs">
      <div
        className="rounded-xl bg-card px-6 py-6 ring-1 ring-border/60"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
      >
        <h3 className="text-center font-heading text-sm font-semibold tracking-tight text-foreground">
          How was this article?
        </h3>

        <motion.div
          className="mt-4 flex justify-center gap-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {reactions.map((r) => (
            <motion.button
              key={r.value}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.88 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 22 }}
              onClick={() => setSelected(r.value)}
              className={`flex flex-col items-center gap-1 rounded-xl px-2.5 py-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                selected === r.value
                  ? "bg-primary/10 ring-2 ring-primary/30 scale-110"
                  : selected
                    ? "opacity-50 hover:opacity-80"
                    : "hover:bg-muted/50"
              }`}
            >
              <motion.span
                className="text-2xl leading-none"
                role="img"
                aria-label={r.label}
                animate={selected === r.value ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 15 }}
              >
                {r.face}
              </motion.span>
              <span className="text-[10px] font-medium text-muted-foreground">{r.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {selected && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
            className="mt-4 text-center text-xs text-muted-foreground"
          >
            Thanks for the quick reaction!
          </motion.p>
        )}
      </div>
    </div>
  )
}
