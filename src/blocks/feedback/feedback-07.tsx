"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const reasons = [
  { value: "too-expensive", label: "Too expensive for my budget" },
  { value: "missing-features", label: "Missing features I need" },
  { value: "found-alternative", label: "Found a better alternative" },
  { value: "too-complex", label: "Too complex to use" },
  { value: "not-needed", label: "No longer need this type of tool" },
  { value: "other", label: "Other reason" },
]

export default function Feedback07() {
  const [selected, setSelected] = useState<string | null>(null)
  const [details, setDetails] = useState("")
  const [step, setStep] = useState<"reasons" | "done">("reasons")

  if (step === "done") {
    return (
      <div className="mx-auto max-w-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
          className="flex flex-col items-center gap-3 rounded-xl bg-card px-8 py-10 ring-1 ring-border/60 text-center"
          style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
        >
          <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">We'll miss you</h3>
          <p className="text-sm text-muted-foreground max-w-[240px]">
            Your feedback will directly influence our roadmap. You can always come back.
          </p>
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
          <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">
            Before you go...
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            We'd love to understand why. Your honesty helps us improve.
          </p>
        </motion.div>

        <div className="mt-5 space-y-1.5">
          {reasons.map((reason) => (
            <motion.button
              key={reason.value}
              variants={itemVariants}
              whileHover={{ x: 2 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              onClick={() => setSelected(reason.value)}
              className={`flex w-full items-center rounded-lg px-4 py-3 text-left text-sm ring-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                selected === reason.value
                  ? "bg-primary/5 ring-primary/30 ring-2 font-medium text-foreground"
                  : "bg-transparent ring-border/40 text-foreground/80 hover:bg-muted/40"
              }`}
            >
              <div className={`mr-3 size-4 rounded-full ring-2 shrink-0 transition-colors ${
                selected === reason.value
                  ? "bg-primary ring-primary"
                  : "bg-transparent ring-border"
              }`}>
                {selected === reason.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" as const, stiffness: 500, damping: 20 }}
                    className="size-full rounded-full bg-primary ring-2 ring-card"
                    style={{ margin: "2px", width: "calc(100% - 4px)", height: "calc(100% - 4px)" }}
                  />
                )}
              </div>
              {reason.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 26 }}
              className="overflow-hidden"
            >
              <Textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Any additional details? (optional)"
                className="mt-4 min-h-[72px] bg-muted/30 text-sm"
              />
              <div className="mt-4 flex gap-2">
                <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground">
                  Stay on current plan
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 text-red-700 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800/50 dark:hover:bg-red-950/30"
                  onClick={() => setStep("done")}
                >
                  Confirm cancellation
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
