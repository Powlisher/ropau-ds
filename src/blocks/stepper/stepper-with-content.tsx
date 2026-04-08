"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

const steps = [
  { title: "Personal Info", description: "Name and contact" },
  { title: "Company", description: "Organization details" },
  { title: "Review", description: "Confirm everything" },
]

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function StepperWithContent() {
  const [active, setActive] = useState(0)

  return (
    <div className="flex min-h-[480px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-lg">
        <div className="flex border-b border-border">
          {steps.map((step, i) => {
            const completed = i < active
            const current = i === active
            return (
              <div
                key={step.title}
                className={`flex flex-1 items-center gap-2.5 px-4 py-3 ${
                  current ? "bg-muted/30" : ""
                }`}
              >
                <div
                  className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-medium tabular-nums ${
                    completed
                      ? "bg-primary text-primary-foreground"
                      : current
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {completed ? <CheckIcon className="size-3" /> : i + 1}
                </div>
                <div className="hidden sm:block">
                  <p className={`text-xs font-medium ${current || completed ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.title}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <CardContent className="pt-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={spring}
              className="flex flex-col gap-4"
            >
              {active === 0 && (
                <>
                  <div className="flex flex-col gap-2">
                    <Label>First name</Label>
                    <Input placeholder="Marie" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Last name</Label>
                    <Input placeholder="Lefebvre" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Email</Label>
                    <Input placeholder="marie@example.com" type="email" />
                  </div>
                </>
              )}
              {active === 1 && (
                <>
                  <div className="flex flex-col gap-2">
                    <Label>Company name</Label>
                    <Input placeholder="Ropau SAS" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Role</Label>
                    <Input placeholder="Head of Product" />
                  </div>
                </>
              )}
              {active === 2 && (
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm font-medium text-foreground">Everything looks good</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Review the details above. You can go back to make changes before confirming.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setActive(Math.max(0, active - 1))} disabled={active === 0}>
            Back
          </Button>
          <Button onClick={() => setActive(Math.min(steps.length - 1, active + 1))}>
            {active === steps.length - 1 ? "Confirm" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
