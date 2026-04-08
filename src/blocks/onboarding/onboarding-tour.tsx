"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const tourSteps = [
  {
    step: 1,
    title: "Your Dashboard",
    description: "See all your projects, tasks, and recent activity in one view. Pin the items you use most to keep them front and center.",
    area: "Overview panel with project cards and activity feed",
  },
  {
    step: 2,
    title: "Command Palette",
    description: "Press Cmd+K anywhere to search, navigate, or run actions. It learns from your usage patterns over time.",
    area: "Floating search overlay with recent commands",
  },
  {
    step: 3,
    title: "Collaboration",
    description: "Tag teammates, leave inline comments, and track changes in real-time. Presence indicators show who is active.",
    area: "Document with comment thread and avatar indicators",
  },
  {
    step: 4,
    title: "Integrations Hub",
    description: "Connected tools sync automatically. Notifications from Slack, commits from GitHub, and designs from Figma appear inline.",
    area: "Grid of connected services with status indicators",
  },
]

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function OnboardingTour() {
  const [current, setCurrent] = useState(0)
  const step = tourSteps[current]

  return (
    <div className="flex min-h-[540px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-md overflow-hidden">
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex h-48 items-center justify-center bg-muted/50 px-6"
            >
              <div className="rounded-lg border border-dashed border-border/60 bg-background/60 px-6 py-4">
                <p className="text-xs text-muted-foreground leading-relaxed">{step.area}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <CardContent className="flex flex-col gap-4 pt-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={spring}
            >
              <Badge variant="secondary" className="mb-2 tabular-nums">
                Step {step.step} of {tourSteps.length}
              </Badge>
              <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-1.5">
              {tourSteps.map((_, i) => (
                <motion.div
                  key={i}
                  className={`h-1.5 rounded-full transition-colors ${
                    i === current ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/20"
                  }`}
                  layout
                  transition={spring}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setCurrent(tourSteps.length - 1)}>
                Skip tour
              </Button>
              <Button
                size="sm"
                onClick={() => setCurrent(Math.min(tourSteps.length - 1, current + 1))}
              >
                {current === tourSteps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
