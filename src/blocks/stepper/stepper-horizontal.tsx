"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  { label: "Account Setup" },
  { label: "Verification" },
  { label: "Payment Details" },
  { label: "Confirmation" },
]

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function StepperHorizontal() {
  const [active, setActive] = useState(1)

  return (
    <div className="flex min-h-[320px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <div className="w-full max-w-lg">
        <div className="flex items-center">
          {steps.map((step, i) => (
            <div key={step.label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  layout
                  transition={spring}
                  className={`relative flex size-9 items-center justify-center rounded-full text-xs font-medium tabular-nums transition-colors ${
                    i < active
                      ? "bg-primary text-primary-foreground"
                      : i === active
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/15"
                        : "bg-muted text-muted-foreground ring-1 ring-border"
                  }`}
                >
                  {i < active ? <CheckIcon className="size-4" /> : i + 1}
                </motion.div>
                <span className={`text-xs font-medium ${i <= active ? "text-foreground" : "text-muted-foreground"}`}>
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="relative mx-2 h-px flex-1 bg-border">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: i < active ? "100%" : "0%" }}
                    transition={spring}
                  />
                </div>
              )}
            </div>
          ))}
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
