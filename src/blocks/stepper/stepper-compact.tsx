"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress"

const steps = ["Details", "Preferences", "Integrations", "Review", "Done"]

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function StepperCompact() {
  const [active, setActive] = useState(2)
  const pct = Math.round((active / (steps.length - 1)) * 100)

  return (
    <div className="flex min-h-[280px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <div className="w-full max-w-md">
        <div className="relative">
          <Progress value={pct}>
            <ProgressTrack className="h-1.5 rounded-full">
              <ProgressIndicator className="rounded-full" />
            </ProgressTrack>
          </Progress>

          <div className="absolute -top-1 left-0 right-0 flex justify-between">
            {steps.map((_, i) => {
              const position = (i / (steps.length - 1)) * 100
              return (
                <motion.div
                  key={i}
                  className={`size-3.5 rounded-full border-2 transition-colors ${
                    i <= active
                      ? "border-primary bg-primary"
                      : "border-border bg-background"
                  }`}
                  style={{ position: "absolute", left: `${position}%`, transform: "translateX(-50%)" }}
                  layout
                  transition={spring}
                />
              )
            })}
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
            className="text-sm font-medium text-foreground"
          >
            {steps[active]}
            <span className="ml-2 text-xs tabular-nums text-muted-foreground">
              {active + 1}/{steps.length}
            </span>
          </motion.p>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setActive(Math.max(0, active - 1))}>
            Back
          </Button>
          <Button size="sm" onClick={() => setActive(Math.min(steps.length - 1, active + 1))}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
