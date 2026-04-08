"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress, ProgressLabel, ProgressValue, ProgressTrack, ProgressIndicator } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"

const steps = ["Account", "Profile", "Workspace", "Review"]

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function StepperProgressBar() {
  const [active, setActive] = useState(1)
  const pct = Math.round((active / (steps.length - 1)) * 100)

  return (
    <div className="flex min-h-[320px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-md">
        <CardContent className="py-6">
          <Progress value={pct}>
            <ProgressLabel className="text-sm font-medium">{steps[active]}</ProgressLabel>
            <ProgressValue className="tabular-nums" />
            <ProgressTrack className="h-2 rounded-full">
              <ProgressIndicator className="rounded-full" />
            </ProgressTrack>
          </Progress>

          <div className="mt-3 flex justify-between">
            {steps.map((step, i) => (
              <motion.span
                key={step}
                className={`text-[11px] font-medium transition-colors ${
                  i <= active ? "text-foreground" : "text-muted-foreground"
                }`}
                animate={{ scale: i === active ? 1.05 : 1 }}
                transition={spring}
              >
                {step}
              </motion.span>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setActive(Math.max(0, active - 1))}>
              Back
            </Button>
            <Button size="sm" onClick={() => setActive(Math.min(steps.length - 1, active + 1))}>
              {active === steps.length - 1 ? "Complete" : "Continue"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
