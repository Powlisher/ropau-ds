"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  { title: "Create account", description: "Enter your email and set a password to get started." },
  { title: "Verify identity", description: "Upload a government-issued ID for compliance." },
  { title: "Add payment method", description: "Link a card or bank account for billing." },
  { title: "Start using the platform", description: "Access all features and invite your team." },
]

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function StepperVertical() {
  const [active, setActive] = useState(1)

  return (
    <div className="flex min-h-[480px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-md">
        <CardContent className="py-6">
          <div className="flex flex-col">
            {steps.map((step, i) => {
              const completed = i < active
              const current = i === active
              return (
                <div key={step.title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <motion.div
                      layout
                      transition={spring}
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-medium tabular-nums ${
                        completed
                          ? "bg-primary text-primary-foreground"
                          : current
                            ? "bg-primary text-primary-foreground ring-4 ring-primary/10"
                            : "bg-muted text-muted-foreground ring-1 ring-border"
                      }`}
                    >
                      {completed ? <CheckIcon className="size-3.5" /> : i + 1}
                    </motion.div>
                    {i < steps.length - 1 && (
                      <div className="relative my-1 w-px flex-1 min-h-8 bg-border">
                        <motion.div
                          className="absolute inset-x-0 top-0 bg-primary"
                          initial={{ height: "0%" }}
                          animate={{ height: completed ? "100%" : "0%" }}
                          transition={spring}
                        />
                      </div>
                    )}
                  </div>
                  <div className={`pb-6 ${i === steps.length - 1 ? "pb-0" : ""}`}>
                    <p className={`text-sm font-medium ${current || completed ? "text-foreground" : "text-muted-foreground"}`}>
                      {step.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setActive(Math.max(0, active - 1))}>
              Back
            </Button>
            <Button size="sm" onClick={() => setActive(Math.min(steps.length - 1, active + 1))}>
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
