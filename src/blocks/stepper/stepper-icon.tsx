"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckIcon, UserIcon, ShieldCheckIcon, CreditCardIcon, RocketIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  { label: "Account", icon: UserIcon },
  { label: "Security", icon: ShieldCheckIcon },
  { label: "Billing", icon: CreditCardIcon },
  { label: "Launch", icon: RocketIcon },
]

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function StepperIcon() {
  const [active, setActive] = useState(2)

  return (
    <div className="flex min-h-[320px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <div className="w-full max-w-lg">
        <div className="flex items-center">
          {steps.map((step, i) => {
            const completed = i < active
            const current = i === active
            const Icon = completed ? CheckIcon : step.icon
            return (
              <div key={step.label} className="flex flex-1 items-center">
                <div className="flex flex-col items-center gap-2">
                  <motion.div
                    layout
                    transition={spring}
                    className={`flex size-10 items-center justify-center rounded-full transition-colors ${
                      completed
                        ? "bg-primary text-primary-foreground"
                        : current
                          ? "bg-primary/10 text-primary ring-2 ring-primary/30"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="size-4.5" />
                  </motion.div>
                  <span
                    className={`text-xs font-medium ${
                      current || completed ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="relative mx-3 h-px flex-1 bg-border">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-primary"
                      animate={{ width: completed ? "100%" : "0%" }}
                      transition={spring}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setActive(Math.max(0, active - 1))}>
            Previous
          </Button>
          <Button size="sm" onClick={() => setActive(Math.min(steps.length - 1, active + 1))}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
