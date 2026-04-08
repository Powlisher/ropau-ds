"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const faces = [
  { value: 1, label: "Very dissatisfied", bg: "bg-red-50 dark:bg-red-950/30", ring: "ring-red-200 dark:ring-red-800/40", face: "\u2639\uFE0F" },
  { value: 2, label: "Dissatisfied", bg: "bg-orange-50 dark:bg-orange-950/30", ring: "ring-orange-200 dark:ring-orange-800/40", face: "\uD83D\uDE1F" },
  { value: 3, label: "Neutral", bg: "bg-yellow-50 dark:bg-yellow-950/30", ring: "ring-yellow-200 dark:ring-yellow-800/40", face: "\uD83D\uDE10" },
  { value: 4, label: "Satisfied", bg: "bg-emerald-50 dark:bg-emerald-950/30", ring: "ring-emerald-200 dark:ring-emerald-800/40", face: "\uD83D\uDE42" },
  { value: 5, label: "Very satisfied", bg: "bg-green-50 dark:bg-green-950/30", ring: "ring-green-200 dark:ring-green-800/40", face: "\uD83D\uDE04" },
]

export default function Feedback04() {
  const [selected, setSelected] = useState<number | null>(null)
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="mx-auto max-w-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
          className="flex flex-col items-center gap-3 rounded-xl bg-card px-8 py-10 ring-1 ring-border/60 text-center"
          style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
        >
          <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">Thanks for your time</h3>
          <p className="text-sm text-muted-foreground">Your satisfaction score has been recorded</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-sm">
      <motion.div
        className="rounded-xl bg-card px-6 py-7 ring-1 ring-border/60"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Customer Satisfaction</p>
          <h3 className="mt-1 font-heading text-base font-semibold tracking-tight text-foreground">
            How satisfied are you with our support?
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Regarding ticket #4821 — API rate limiting issue
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-5 flex justify-between gap-1.5">
          {faces.map((f) => (
            <motion.button
              key={f.value}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 22 }}
              onClick={() => setSelected(f.value)}
              className={`flex flex-col items-center gap-1 rounded-xl px-2.5 py-2.5 ring-1 transition-colors flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                selected === f.value
                  ? `${f.bg} ${f.ring} ring-2`
                  : "bg-transparent ring-transparent hover:bg-muted/40"
              }`}
            >
              <span className="text-xl leading-none" role="img" aria-label={f.label}>{f.face}</span>
              <span className={`text-[10px] font-medium leading-tight text-center ${
                selected === f.value ? "text-foreground" : "text-muted-foreground"
              }`}>
                {f.label}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {selected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 26 }}
            className="overflow-hidden"
          >
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Anything you'd like to add? (optional)"
              className="mt-4 min-h-[80px] bg-muted/30 text-sm"
            />
            <div className="mt-3 flex justify-end">
              <Button size="sm" onClick={() => setSubmitted(true)}>Submit</Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
