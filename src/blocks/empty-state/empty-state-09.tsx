"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Check, Circle } from "lucide-react"

const steps = [
  { label: "Create your account", status: "complete" as const },
  { label: "Set up your workspace", status: "complete" as const },
  { label: "Invite at least 2 teammates", status: "current" as const, hint: "Collaboration unlocks shared dashboards and real-time editing." },
  { label: "Create your first project", status: "upcoming" as const },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function EmptyState09() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex w-full max-w-md flex-col items-center py-12"
    >
      <motion.div variants={itemVariants} className="mb-8 text-center">
        <h3 className="font-heading text-xl font-semibold tracking-tight">
          Welcome to your workspace
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Complete these steps to get the most out of the platform.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-6 flex items-center gap-2">
        <span className="font-mono text-sm font-semibold tabular-nums text-foreground">2</span>
        <span className="text-sm text-muted-foreground">of</span>
        <span className="font-mono text-sm font-semibold tabular-nums text-foreground">4</span>
        <span className="text-sm text-muted-foreground">completed</span>
        <div className="ml-2 h-1.5 w-24 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: "oklch(0.60 0.16 145)" }}
            initial={{ width: 0 }}
            animate={{ width: "50%" }}
            transition={{ type: "spring" as const, stiffness: 80, damping: 20, delay: 0.4 }}
          />
        </div>
      </motion.div>

      <div className="w-full space-y-2">
        {steps.map((step, i) => (
          <motion.div
            key={step.label}
            variants={itemVariants}
            className={`flex items-start gap-3.5 rounded-xl p-4 ${
              step.status === "current"
                ? "bg-card ring-1 ring-foreground/[0.08]"
                : ""
            }`}
            style={
              step.status === "current"
                ? {
                    boxShadow:
                      "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
                  }
                : undefined
            }
          >
            <div className="mt-0.5 shrink-0">
              {step.status === "complete" ? (
                <div
                  className="flex size-6 items-center justify-center rounded-full"
                  style={{ backgroundColor: "oklch(0.60 0.16 145)" }}
                >
                  <Check className="size-3.5 text-white" strokeWidth={3} />
                </div>
              ) : step.status === "current" ? (
                <div
                  className="flex size-6 items-center justify-center rounded-full ring-2"
                  style={{ outlineColor: "oklch(0.60 0.16 260)", borderColor: "oklch(0.60 0.16 260)" }}
                >
                  <span className="font-mono text-xs font-bold tabular-nums" style={{ color: "oklch(0.60 0.16 260)" }}>
                    {i + 1}
                  </span>
                </div>
              ) : (
                <div className="flex size-6 items-center justify-center">
                  <Circle className="size-5 text-muted-foreground/30" strokeWidth={1.5} />
                </div>
              )}
            </div>

            <div className="flex-1">
              <p
                className={`text-sm font-medium ${
                  step.status === "complete"
                    ? "text-muted-foreground line-through"
                    : step.status === "current"
                      ? "text-foreground"
                      : "text-muted-foreground/60"
                }`}
              >
                {step.label}
              </p>
              {step.status === "current" && step.hint && (
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {step.hint}
                </p>
              )}
              {step.status === "current" && (
                <Button size="sm" className="mt-3 h-8 text-xs">
                  Invite teammates
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
