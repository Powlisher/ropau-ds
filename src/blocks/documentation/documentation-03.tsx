"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const steps = [
  {
    title: "Install the SDK",
    description: "Add the package to your project with your preferred package manager.",
    code: "npm install @ropau/sdk",
    completed: true,
  },
  {
    title: "Configure your API key",
    description: "Create a .env.local file at the root of your project and add your key.",
    code: 'ROPAU_API_KEY="rpk_live_7x9Kp2mN..."',
    completed: true,
  },
  {
    title: "Initialize the client",
    description: "Import and create a client instance. This handles auth and retries automatically.",
    code: `import { createClient } from "@ropau/sdk"
const client = createClient({ apiKey: process.env.ROPAU_API_KEY! })`,
    completed: false,
  },
  {
    title: "Make your first request",
    description: "Fetch your project analytics to verify the integration is working.",
    code: `const data = await client.analytics.query({
  from: "2026-03-01",
  granularity: "day",
})`,
    completed: false,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

export default function Documentation03() {
  const [completedSteps, setCompletedSteps] = useState(
    new Set(steps.filter((s) => s.completed).map((_, i) => i))
  )

  function toggleStep(idx: number) {
    setCompletedSteps((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-xl"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Getting Started
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Set up the Ropau SDK in under 5 minutes. Follow these steps to start tracking analytics.
        </p>
      </motion.div>

      <div className="relative">
        <div className="absolute left-[19px] top-6 bottom-6 w-px bg-border" />

        <div className="space-y-0">
          {steps.map((step, idx) => {
            const done = completedSteps.has(idx)
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative flex gap-4 pb-8 last:pb-0"
              >
                <button
                  onClick={() => toggleStep(idx)}
                  className={`relative z-10 mt-0.5 flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full ring-4 ring-background transition-colors ${
                    done
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground ring-1 ring-inset ring-foreground/10"
                  }`}
                  style={
                    !done
                      ? {
                          boxShadow:
                            "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04)",
                        }
                      : undefined
                  }
                >
                  {done ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="font-mono text-xs font-semibold tabular-nums">
                      {idx + 1}
                    </span>
                  )}
                </button>

                <div className="flex-1 pt-1">
                  <h3
                    className={`font-heading text-sm font-semibold tracking-tight ${
                      done ? "text-muted-foreground line-through" : ""
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                  <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-3.5 font-mono text-xs leading-relaxed text-slate-300">
                    {step.code}
                  </pre>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <motion.div variants={itemVariants} className="mt-8 flex items-center gap-3">
        <Button className="gap-2">
          View Full Documentation
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
        <Button variant="outline">Join Discord</Button>
      </motion.div>
    </motion.div>
  )
}
