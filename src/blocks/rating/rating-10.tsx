"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

const optionA = {
  label: "Standard plan",
  price: "$29/mo",
  features: ["5 team members", "10 GB storage", "Email support", "Basic analytics"],
}

const optionB = {
  label: "Pro plan",
  price: "$79/mo",
  features: ["Unlimited members", "100 GB storage", "Priority support", "Advanced analytics", "Custom integrations"],
}

export default function Rating10() {
  const [preference, setPreference] = useState<"a" | "b" | null>(null)

  return (
    <div className="mx-auto max-w-lg">
      <motion.div
        className="rounded-xl bg-card px-6 py-7 ring-1 ring-border/60"
        style={{ boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">
            Which plan appeals to you more?
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Help us understand what matters to teams like yours
          </p>
        </motion.div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {([["a", optionA], ["b", optionB]] as const).map(([key, opt]) => (
            <motion.button
              key={key}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              onClick={() => setPreference(key)}
              className={`flex flex-col rounded-xl p-5 text-left ring-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                preference === key
                  ? "bg-primary/5 ring-primary/40 ring-2"
                  : "bg-muted/20 ring-border/60 hover:bg-muted/40"
              }`}
              style={preference === key ? {
                boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04)"
              } : undefined}
            >
              <span className="font-heading text-sm font-semibold tracking-tight text-foreground">
                {opt.label}
              </span>
              <span className="mt-1 font-mono text-lg font-bold tabular-nums tracking-tight text-foreground">
                {opt.price}
              </span>
              <ul className="mt-3 space-y-1.5">
                {opt.features.map((f) => (
                  <li key={f} className="text-xs text-muted-foreground leading-relaxed">
                    {f}
                  </li>
                ))}
              </ul>
              {preference === key && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
                  className="mt-3 self-start rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-medium text-primary-foreground"
                >
                  Your pick
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {preference && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
            className="mt-5 flex justify-end"
          >
            <Button size="sm">Submit preference</Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
