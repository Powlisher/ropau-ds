"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight, Key, Settings, Zap } from "lucide-react"
import { useState } from "react"

const steps = [
  { id: 1, title: "Authenticate", description: "Connect your Stripe account securely via OAuth", icon: Key },
  { id: 2, title: "Configure", description: "Select products, webhooks, and sync frequency", icon: Settings },
  { id: 3, title: "Activate", description: "Run initial sync and verify data integrity", icon: Zap },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function Integration03() {
  const [currentStep, setCurrentStep] = useState(2)

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-md mx-auto">
      <motion.div variants={itemVariants} className="text-center mb-8">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-foreground/5 mb-3">
          <Zap className="h-6 w-6 text-foreground/70" />
        </div>
        <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">
          Connect Stripe
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Step {currentStep} of {steps.length}
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="flex items-center justify-center gap-0 mb-8">
        {steps.map((step, i) => {
          const isCompleted = step.id < currentStep
          const isCurrent = step.id === currentStep
          return (
            <div key={step.id} className="flex items-center">
              <motion.button
                onClick={() => setCurrentStep(step.id)}
                className={`relative flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                  isCompleted
                    ? "bg-foreground text-background"
                    : isCurrent
                      ? "bg-foreground text-background ring-4 ring-foreground/10"
                      : "bg-muted text-muted-foreground/40"
                }`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="font-mono text-xs font-semibold tabular-nums">{step.id}</span>
                )}
              </motion.button>
              {i < steps.length - 1 && (
                <div className={`h-0.5 w-12 mx-1 rounded-full transition-colors ${
                  step.id < currentStep ? "bg-foreground" : "bg-muted"
                }`} />
              )}
            </div>
          )
        })}
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="rounded-2xl bg-card p-6 ring-1 ring-foreground/5"
        style={{
          boxShadow: "0 1px 2px rgba(20,20,15,0.04), 0 2px 4px rgba(20,20,15,0.04), 0 4px 8px rgba(20,20,15,0.04), 0 8px 16px rgba(20,20,15,0.04)",
        }}
      >
        {steps.map((step) => {
          if (step.id !== currentStep) return null
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50">
                  <step.icon className="h-5 w-5 text-foreground/60" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground/60">{step.description}</p>
                </div>
              </div>

              {step.id === 1 && (
                <div className="space-y-3 mt-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    You will be redirected to Stripe to authorize access. We request read-only permissions for charges, customers, and subscriptions.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                    onClick={() => setCurrentStep(2)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-foreground py-2.5 text-sm font-medium text-background"
                  >
                    Connect with Stripe
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              )}

              {step.id === 2 && (
                <div className="space-y-4 mt-5">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground/70 mb-1.5 block">Sync frequency</label>
                    <select className="w-full rounded-xl bg-muted/30 border-0 py-2.5 px-3 text-sm ring-1 ring-foreground/5 focus:outline-none focus:ring-2 focus:ring-foreground/10">
                      <option>Every 5 minutes</option>
                      <option>Every 15 minutes</option>
                      <option>Every hour</option>
                      <option>Real-time (webhooks)</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-foreground">Sync historical data</span>
                    <div className="h-5 w-9 rounded-full bg-foreground relative">
                      <div className="absolute top-0.5 left-[18px] h-4 w-4 rounded-full bg-background" />
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                    onClick={() => setCurrentStep(3)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-foreground py-2.5 text-sm font-medium text-background"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              )}

              {step.id === 3 && (
                <div className="space-y-4 mt-5">
                  <div className="rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-200/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-800">Connection verified</span>
                    </div>
                    <p className="text-xs text-emerald-700/70">
                      Successfully authenticated. Ready to sync 2,847 customers and 14,293 charges.
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-foreground py-2.5 text-sm font-medium text-background"
                  >
                    Activate Integration
                    <Zap className="h-4 w-4" />
                  </motion.button>
                </div>
              )}
            </motion.div>
          )
        })}
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-center mt-4">
        {currentStep > 1 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Go back
          </button>
        )}
      </motion.div>
    </motion.div>
  )
}
