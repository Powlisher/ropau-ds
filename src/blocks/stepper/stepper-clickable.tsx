"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  { title: "Basics", content: "Configure the fundamental settings for your project." },
  { title: "Features", content: "Select which features to enable in your workspace." },
  { title: "Permissions", content: "Set access levels and roles for your team." },
  { title: "Deploy", content: "Review settings and deploy your configuration." },
]

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function StepperClickable() {
  const [active, setActive] = useState(1)
  const [visited, setVisited] = useState<Set<number>>(new Set([0, 1]))

  function goTo(i: number) {
    if (visited.has(i) || i <= active) {
      setActive(i)
      setVisited((prev) => new Set([...prev, i]))
    }
  }

  return (
    <div className="flex min-h-[400px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-md">
        <CardContent className="py-6">
          <div className="flex gap-2 mb-6">
            {steps.map((step, i) => {
              const completed = visited.has(i) && i < active
              const current = i === active
              const clickable = visited.has(i) || i <= active

              return (
                <button
                  key={step.title}
                  onClick={() => goTo(i)}
                  disabled={!clickable}
                  className={`flex flex-1 flex-col items-center gap-1.5 rounded-lg px-2 py-2 transition-colors ${
                    clickable ? "cursor-pointer hover:bg-muted/50" : "cursor-not-allowed opacity-40"
                  }`}
                >
                  <motion.div
                    layout
                    transition={spring}
                    className={`flex size-7 items-center justify-center rounded-full text-[11px] font-medium tabular-nums ${
                      completed
                        ? "bg-primary text-primary-foreground"
                        : current
                          ? "bg-primary text-primary-foreground ring-3 ring-primary/15"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {completed ? <CheckIcon className="size-3" /> : i + 1}
                  </motion.div>
                  <span className={`text-[11px] font-medium ${current ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.title}
                  </span>
                </button>
              )
            })}
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
            className="rounded-lg bg-muted/40 p-4"
          >
            <p className="text-sm font-medium text-foreground">{steps[active].title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{steps[active].content}</p>
          </motion.div>

          <p className="mt-3 text-center text-[10px] uppercase tracking-wider text-muted-foreground">
            Click any visited step to navigate back
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
