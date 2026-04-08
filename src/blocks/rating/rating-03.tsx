"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 350, damping: 22 } },
}

const faces = [
  { value: 1, face: "\u2639\uFE0F", label: "Terrible", bg: "bg-red-50 dark:bg-red-950/30", ring: "ring-red-200 dark:ring-red-800/40" },
  { value: 2, face: "\uD83D\uDE1F", label: "Bad", bg: "bg-orange-50 dark:bg-orange-950/30", ring: "ring-orange-200 dark:ring-orange-800/40" },
  { value: 3, face: "\uD83D\uDE10", label: "Okay", bg: "bg-yellow-50 dark:bg-yellow-950/30", ring: "ring-yellow-200 dark:ring-yellow-800/40" },
  { value: 4, face: "\uD83D\uDE42", label: "Good", bg: "bg-emerald-50 dark:bg-emerald-950/30", ring: "ring-emerald-200 dark:ring-emerald-800/40" },
  { value: 5, face: "\uD83D\uDE04", label: "Great", bg: "bg-green-50 dark:bg-green-950/30", ring: "ring-green-200 dark:ring-green-800/40" },
]

export default function Rating03() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div className="mx-auto max-w-sm">
      <div
        className="rounded-xl bg-card px-6 py-7 ring-1 ring-border/60"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
      >
        <h3 className="text-center font-heading text-base font-semibold tracking-tight text-foreground">
          How do you feel about this update?
        </h3>
        <p className="mt-1 mb-6 text-center text-sm text-muted-foreground">
          Tap the face that best matches your reaction
        </p>

        <motion.div
          className="flex justify-center gap-2.5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {faces.map((f) => (
            <motion.button
              key={f.value}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 22 }}
              onClick={() => setSelected(f.value)}
              className={`flex flex-col items-center gap-1.5 rounded-xl px-3 py-3 ring-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                selected === f.value
                  ? `${f.bg} ${f.ring} ring-2`
                  : "bg-transparent ring-transparent hover:bg-muted/50"
              }`}
            >
              <span className="text-2xl leading-none" role="img" aria-label={f.label}>
                {f.face}
              </span>
              <span className={`text-[11px] font-medium tracking-wide ${
                selected === f.value ? "text-foreground" : "text-muted-foreground"
              }`}>
                {f.label}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {selected && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
            className="mt-5 text-center text-sm text-muted-foreground"
          >
            Thanks for your feedback!
          </motion.p>
        )}
      </div>
    </div>
  )
}
