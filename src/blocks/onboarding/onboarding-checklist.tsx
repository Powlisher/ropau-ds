"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { GiftIcon } from "lucide-react"

const tasks = [
  { id: "profile", label: "Complete your profile", description: "Add a photo and bio" },
  { id: "workspace", label: "Create a workspace", description: "Set up your first project space" },
  { id: "invite", label: "Invite a teammate", description: "Collaboration unlocks the best features" },
  { id: "integration", label: "Connect an integration", description: "Sync with Slack, GitHub, or Figma" },
  { id: "first-task", label: "Create your first task", description: "Try the task manager" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
}

export default function OnboardingChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set(["profile"]))
  const progress = Math.round((checked.size / tasks.length) * 100)
  const allDone = checked.size === tasks.length

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="flex min-h-[540px] items-center justify-center bg-muted/40 p-6 md:p-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg">Getting started</CardTitle>
          <CardDescription>Complete these steps to unlock your workspace</CardDescription>
          <div className="mt-3">
            <Progress value={progress}>
              <ProgressLabel className="text-xs text-muted-foreground">Progress</ProgressLabel>
              <ProgressValue className="text-xs tabular-nums" />
            </Progress>
          </div>
        </CardHeader>

        <CardContent>
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-1"
          >
            {tasks.map((task) => {
              const done = checked.has(task.id)
              return (
                <motion.li key={task.id} variants={itemVariants}>
                  <button
                    onClick={() => toggle(task.id)}
                    className={`flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-muted/60 ${
                      done ? "opacity-60" : ""
                    }`}
                  >
                    <Checkbox checked={done} className="mt-0.5" tabIndex={-1} />
                    <div className="flex flex-col gap-0.5">
                      <span className={`text-sm font-medium ${done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                        {task.label}
                      </span>
                      <span className="text-xs text-muted-foreground">{task.description}</span>
                    </div>
                  </button>
                </motion.li>
              )
            })}
          </motion.ul>

          {allDone && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
              className="mt-4 rounded-lg bg-primary/5 p-4 ring-1 ring-primary/15"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                  <GiftIcon className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">All steps complete</p>
                  <p className="text-xs text-muted-foreground">Your Pro trial is now extended to 30 days</p>
                </div>
              </div>
              <Button className="mt-3 w-full" size="sm">
                Go to Dashboard
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
