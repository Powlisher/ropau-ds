"use client"

import { useState } from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Rating04() {
  const [vote, setVote] = useState<"up" | "down" | null>(null)
  const [upCount, setUpCount] = useState(143)
  const [downCount, setDownCount] = useState(18)

  function handleVote(v: "up" | "down") {
    if (vote === v) {
      setVote(null)
      if (v === "up") setUpCount((c) => c - 1)
      else setDownCount((c) => c - 1)
    } else {
      if (vote === "up") setUpCount((c) => c - 1)
      if (vote === "down") setDownCount((c) => c - 1)
      setVote(v)
      if (v === "up") setUpCount((c) => c + 1)
      else setDownCount((c) => c + 1)
    }
  }

  return (
    <div className="mx-auto max-w-xs">
      <motion.div
        className="flex flex-col items-center gap-5 rounded-xl bg-card px-8 py-7 ring-1 ring-border/60"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h3 className="text-center font-heading text-base font-semibold tracking-tight text-foreground">
            Was this article helpful?
          </h3>
        </motion.div>

        <motion.div variants={itemVariants} className="flex gap-4">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 22 }}
            onClick={() => handleVote("up")}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 ring-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
              vote === "up"
                ? "bg-emerald-50 ring-emerald-200 text-emerald-700 dark:bg-emerald-950/30 dark:ring-emerald-800/50 dark:text-emerald-400"
                : "bg-transparent ring-border/60 text-foreground/60 hover:bg-muted/50"
            }`}
          >
            <ThumbsUp className={`size-5 ${vote === "up" ? "fill-current" : ""}`} />
            <span className="text-sm font-medium tabular-nums">{upCount}</span>
          </motion.button>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 22 }}
            onClick={() => handleVote("down")}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 ring-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
              vote === "down"
                ? "bg-red-50 ring-red-200 text-red-700 dark:bg-red-950/30 dark:ring-red-800/50 dark:text-red-400"
                : "bg-transparent ring-border/60 text-foreground/60 hover:bg-muted/50"
            }`}
          >
            <ThumbsDown className={`size-5 ${vote === "down" ? "fill-current" : ""}`} />
            <span className="text-sm font-medium tabular-nums">{downCount}</span>
          </motion.button>
        </motion.div>

        {vote && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
            className="text-xs text-muted-foreground"
          >
            Thanks for letting us know
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}
