"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { CheckIcon } from "lucide-react"

const steps = [
  { title: "Welcome", body: "Thanks for signing up. Let us walk you through the essentials to get the most out of your workspace from day one." },
  { title: "Configure", body: "Set your display name, upload a profile photo, and choose a theme. These help your teammates recognize you." },
  { title: "Connect", body: "Link the tools you already use. Ropau supports Slack, GitHub, Linear, Figma, and 20+ other integrations." },
  { title: "Ready", body: "Everything is set. Your dashboard is pre-populated with sample data so you can explore at your own pace." },
]

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
}

export default function StepperAnimated() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)

  function go(next: number) {
    setDirection(next > active ? 1 : -1)
    setActive(next)
  }

  return (
    <div className="flex min-h-[440px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-md overflow-hidden">
        <div className="flex gap-1 border-b border-border px-4 py-3">
          {steps.map((_, i) => (
            <motion.div
              key={i}
              className={`h-1 flex-1 rounded-full ${i <= active ? "bg-primary" : "bg-muted"}`}
              layout
              transition={spring}
            />
          ))}
        </div>

        <CardContent className="relative min-h-[200px] pt-6">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={spring}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <div className={`flex size-8 items-center justify-center rounded-full text-xs font-medium tabular-nums ${
                  active === steps.length - 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary"
                }`}>
                  {active === steps.length - 1 ? <CheckIcon className="size-4" /> : active + 1}
                </div>
                <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                  {steps[active].title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground pl-11">
                {steps[active].body}
              </p>
            </motion.div>
          </AnimatePresence>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => go(Math.max(0, active - 1))} disabled={active === 0}>
            Back
          </Button>
          <Button onClick={() => go(Math.min(steps.length - 1, active + 1))}>
            {active === steps.length - 1 ? "Get Started" : "Continue"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
