"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  { title: "Account Creation", subtitle: "Set up your credentials and profile" },
  { title: "Identity Verification", subtitle: "Confirm your identity with a document" },
  { title: "Payment Configuration", subtitle: "Add billing info and select a plan" },
  { title: "Final Review", subtitle: "Verify all details before submission" },
]

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function StepperLabeled() {
  const [active, setActive] = useState(1)

  return (
    <div className="flex min-h-[400px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-xl">
        <CardContent className="py-6">
          <div className="flex flex-col gap-0">
            {steps.map((step, i) => {
              const completed = i < active
              const current = i === active
              return (
                <div key={step.title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <motion.div
                      layout
                      transition={spring}
                      className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-medium tabular-nums ${
                        completed
                          ? "bg-primary text-primary-foreground"
                          : current
                            ? "bg-primary text-primary-foreground ring-4 ring-primary/10"
                            : "bg-muted text-muted-foreground ring-1 ring-border"
                      }`}
                    >
                      {completed ? <CheckIcon className="size-4" /> : i + 1}
                    </motion.div>
                    {i < steps.length - 1 && (
                      <div className="relative my-1.5 w-px flex-1 min-h-6 bg-border">
                        <motion.div
                          className="absolute inset-x-0 top-0 bg-primary"
                          animate={{ height: completed ? "100%" : "0%" }}
                          transition={spring}
                        />
                      </div>
                    )}
                  </div>
                  <div className={`pb-7 ${i === steps.length - 1 ? "pb-0" : ""}`}>
                    <p className={`text-base font-semibold tracking-tight ${
                      current || completed ? "text-foreground" : "text-muted-foreground"
                    }`}>
                      {step.title}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{step.subtitle}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 flex gap-2">
            <Button variant="outline" onClick={() => setActive(Math.max(0, active - 1))}>
              Previous
            </Button>
            <Button onClick={() => setActive(Math.min(steps.length - 1, active + 1))}>
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
