"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { CheckIcon } from "lucide-react"

const steps = [
  { title: "Account", description: "Create your credentials" },
  { title: "Profile", description: "Tell us about yourself" },
  { title: "Workspace", description: "Configure your environment" },
  { title: "Finish", description: "Review and confirm" },
]

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

export default function OnboardingMultiStep() {
  const [current, setCurrent] = useState(0)

  return (
    <div className="flex min-h-[540px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            {steps.map((step, i) => (
              <div key={step.title} className="flex items-center gap-2">
                <motion.div
                  className={`flex size-8 items-center justify-center rounded-full text-xs font-medium tabular-nums transition-colors ${
                    i < current
                      ? "bg-primary text-primary-foreground"
                      : i === current
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/15"
                        : "bg-muted text-muted-foreground"
                  }`}
                  layout
                  transition={spring}
                >
                  {i < current ? <CheckIcon className="size-3.5" /> : i + 1}
                </motion.div>
                {i < steps.length - 1 && (
                  <div className="hidden h-px w-6 bg-border sm:block">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: i < current ? "100%" : "0%" }}
                      transition={spring}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <CardTitle className="text-lg">{steps[current].title}</CardTitle>
          <CardDescription>{steps[current].description}</CardDescription>
        </CardHeader>

        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={spring}
              className="flex flex-col gap-4"
            >
              {current === 0 && (
                <>
                  <div className="flex flex-col gap-2">
                    <Label>Email</Label>
                    <Input placeholder="marie@example.com" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Password</Label>
                    <Input type="password" placeholder="At least 8 characters" />
                  </div>
                </>
              )}
              {current === 1 && (
                <>
                  <div className="flex flex-col gap-2">
                    <Label>Full name</Label>
                    <Input placeholder="Marie Lefebvre" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Job title</Label>
                    <Input placeholder="Product Designer" />
                  </div>
                </>
              )}
              {current === 2 && (
                <>
                  <div className="flex flex-col gap-2">
                    <Label>Workspace name</Label>
                    <Input placeholder="Ropau Studio" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Team size</Label>
                    <Input placeholder="12" type="number" />
                  </div>
                </>
              )}
              {current === 3 && (
                <div className="rounded-lg bg-muted/60 p-5">
                  <p className="text-sm font-medium text-foreground">Ready to go</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Your workspace will be created with 3 default channels and a 14-day Pro trial.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrent(Math.max(0, current - 1))}
            disabled={current === 0}
          >
            Back
          </Button>
          <Button onClick={() => setCurrent(Math.min(steps.length - 1, current + 1))}>
            {current === steps.length - 1 ? "Create Workspace" : "Continue"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
